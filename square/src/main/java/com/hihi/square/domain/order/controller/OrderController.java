package com.hihi.square.domain.order.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.hihi.square.domain.order.dto.response.RefundInfoResponseDto;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hihi.square.domain.order.dto.request.OrderRequestDto;
import com.hihi.square.domain.order.dto.request.PaymentRequestDto;
import com.hihi.square.domain.order.dto.response.OrderIdResponseDto;
import com.hihi.square.domain.order.dto.response.OrderResponseDto;
import com.hihi.square.domain.order.entity.Order;
import com.hihi.square.domain.order.entity.OrderStatus;
import com.hihi.square.domain.order.event.OrderEvent;
import com.hihi.square.domain.order.service.OrderService;
import com.hihi.square.domain.point.service.PointService;
import com.hihi.square.domain.store.entity.Store;
import com.hihi.square.domain.store.repository.StoreRepository;
import com.hihi.square.domain.user.entity.Customer;
import com.hihi.square.domain.user.repository.CustomerRepository;
import com.hihi.square.global.common.CommonResponseDto;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/order")
@RequiredArgsConstructor
@Slf4j
public class OrderController {

	private final CustomerRepository customerRepository;
	private final StoreRepository storeRepository;
	private final OrderService orderService;
	private final PointService pointService;

	// private final NotificationService notificationService;
	private final ApplicationEventPublisher eventPublisher;

	// 주문 아이디 조회 id : 주문 아이디
	//    @GetMapping("/{id}")
	// STEP 01

	// 주문 등록
	@Transactional
	@PostMapping
	public ResponseEntity<OrderIdResponseDto> registerOrder(@RequestBody OrderRequestDto request) {
		Customer customer = customerRepository.findById(request.getCusId()).get();
		// 만약 입력한 포인트가 사용자가 보유한 포인트보다 많을 시에
		if (request.getUsedPoint() > customer.getPoint()) {
			return new ResponseEntity<>(OrderIdResponseDto.builder().status(400).message("POINT_NOT_ENOUTH").build(),
				HttpStatus.BAD_REQUEST);
		}

		// 주문 등록
		Integer ordId = orderService.saveOrder(customer, request);

		return new ResponseEntity<>(OrderIdResponseDto.builder().ordId(ordId).status(200).message("SUCCESS").build(),
			HttpStatus.CREATED);
	}

	// STEP 02
	// 구매자 결제 성공 실패 여부
	// 주문 status 수정 및 포인트 차감 및 적립
	@Transactional
	@PatchMapping("/customer-pay")
	public ResponseEntity<?> updatePaymentStatus(@RequestBody PaymentRequestDto request) {
		CommonResponseDto response = CommonResponseDto.builder()
			.statusCode(200)
			.message("UPDATE_SUCCESS")
			.build();
		Order order = orderService.findById(request.getOrdId()).get();
		Customer customer = order.getCustomer();

		// 결제 성공시
		if (request.getPaymentSuccess()) {
			order.updateOrderStatus(OrderStatus.PAYMENT_COMPLETE);
			order.updatePaymentMethod(request.getPaymentMethod());

			if (order.getUsedPoint() > 0) {
				// 주문 등록되자마자 포인트 차감
				pointService.save(order.getOrdId(), customer, order.getUsedPoint(), 0);
				// customer객체에 포인트 반영
				customer.updatePoint(customer.getPoint() - order.getUsedPoint());
				// db 수정
				customerRepository.save(customer);
			}
			//store에게 주문 도착 알림 전송
			eventPublisher.publishEvent(new OrderEvent(order, "주문이 도착했습니다."));

		} else {
			order.updateOrderStatus(OrderStatus.PAYMENT_FAILED);
		}
		orderService.save(order);

		return new ResponseEntity<>(response, HttpStatus.OK);
	}

	//STEP 03
	// 가게 주문 수락시 프로세스 -> return도 가게로 들어가는거임
	@Transactional
	@PatchMapping("/store-acceptance/{ordId}")
	public ResponseEntity<?> updateOrderSuccess(@PathVariable Integer ordId) {
		OrderIdResponseDto response = OrderIdResponseDto.builder()
			.ordId(ordId)
			.status(200)
			.message("UPDATE_SUCCESS")
			.build();
		Order order = orderService.findByOrderId(ordId).get();
		orderService.updateOrderAccepted(order);
		
		// 소비자로 알림 전송 : 주문 수락됨
		eventPublisher.publishEvent(new OrderEvent(order, "주문이 수락되었습니다."));
		return new ResponseEntity<>(response, HttpStatus.OK);
	}


	// 가게 주문 거절시 프로세스
	@Transactional
	@PatchMapping("/store-denied/{ordId}")
	public ResponseEntity<?> updateOrderDenied(@PathVariable Integer ordId) {
		Order order = orderService.findByOrderId(ordId).get();
		RefundInfoResponseDto response = orderService.updateOrderDenied(order);
		
		// 소비자로 알림 전송 : 주문 거절됨 환불 진행
		eventPublisher.publishEvent(new OrderEvent(order, "주문이 거절되었습니다."));
		return new ResponseEntity<>(response, HttpStatus.OK);
	}

	// STEP 04
	// 픽업 완료시 상태변경
	@Transactional
	@PatchMapping("/store-pickup/{ordId}")
	public ResponseEntity<?> updateOrderPickup(@PathVariable Integer ordId) {
		CommonResponseDto response = CommonResponseDto.builder()
				.statusCode(200)
				.message("UPDATE_SUCCESS")
				.build();
		Order order = orderService.findByOrderId(ordId).get();
		orderService.updateOrderPickup(order);

		// 소비자로 알림 전송 : 픽업 완료
		eventPublisher.publishEvent(new OrderEvent(order, "픽업이 완료되었습니다."));
		return new ResponseEntity<>(response, HttpStatus.OK);
	}


	// 주문 상세 조회
	@Transactional(readOnly = true)
	@GetMapping("/{id}")  // 아이디 : 주문 아이디
	public ResponseEntity<?> findOrderById(@PathVariable Integer id) {
		OrderResponseDto response = orderService.findOrderById(id);
		// 사용자 아이디가 일치하지 않을 시 메소드 추가
		return new ResponseEntity<>(response, HttpStatus.OK);
	}

	// 주문 내역 전체 조회 사용자별로
	@Transactional(readOnly = true)
	@GetMapping("/customer/{cusId}")
	public ResponseEntity<?> findOrderByUserId(@PathVariable Integer cusId) {
		List<OrderResponseDto> response = new ArrayList<>();
		Customer customer = customerRepository.findById(cusId).get();
		List<Optional<Order>> orders = orderService.findByCustomer(customer);

		for (Optional<Order> order : orders) {
			OrderResponseDto responseDto = orderService.findOrderById(order.get().getOrdId());
			response.add(responseDto);
		}

		return new ResponseEntity<>(response, HttpStatus.OK);
	}

	// 주문 내역 전체 조회 가게별로
	@Transactional(readOnly = true)
	@GetMapping("/store/{stoId}")
	public ResponseEntity<?> findOrderByStoreId(@PathVariable Integer stoId) {
		List<OrderResponseDto> response = new ArrayList<>();
		Store store = storeRepository.findById(stoId).get();
		List<Optional<Order>> orders = orderService.findByStore(store);

		for (Optional<Order> order : orders) {
			OrderResponseDto responseDto = orderService.findOrderById(order.get().getOrdId());
			response.add(responseDto);
		}

		return new ResponseEntity<>(response, HttpStatus.OK);
	}
}
