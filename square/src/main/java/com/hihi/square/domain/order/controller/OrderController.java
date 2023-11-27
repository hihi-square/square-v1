package com.hihi.square.domain.order.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.context.ApplicationEventPublisher;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hihi.square.domain.coupon.dto.response.OrderCouponResponseDto;
import com.hihi.square.domain.coupon.entity.Coupon;
import com.hihi.square.domain.coupon.entity.IssueCoupon;
import com.hihi.square.domain.coupon.service.IssueCouponService;
import com.hihi.square.domain.order.dto.request.OrderRequestDto;
import com.hihi.square.domain.order.dto.request.PaymentRequestDto;
import com.hihi.square.domain.order.dto.response.OrderIdResponseDto;
import com.hihi.square.domain.order.dto.response.OrderResponseDto;
import com.hihi.square.domain.order.dto.response.OrderStatusCountDto;
import com.hihi.square.domain.order.dto.response.PaymentAndOrderAcceptNumberResponseDto;
import com.hihi.square.domain.order.dto.response.RefundInfoResponseDto;
import com.hihi.square.domain.order.entity.Order;
import com.hihi.square.domain.order.entity.OrderStatus;
import com.hihi.square.domain.order.event.OrderEvent;
import com.hihi.square.domain.order.service.OrderService;
import com.hihi.square.domain.point.service.PointService;
import com.hihi.square.domain.store.entity.Store;
import com.hihi.square.domain.store.repository.StoreRepository;
import com.hihi.square.domain.user.entity.Customer;
import com.hihi.square.domain.user.entity.User;
import com.hihi.square.domain.user.repository.CustomerRepository;
import com.hihi.square.domain.user.service.UserService;
import com.hihi.square.global.common.CommonResponseDto;
import com.hihi.square.global.sse.SseService;

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
	private final IssueCouponService issueCouponService;
	private final UserService userService;
	private final ApplicationEventPublisher eventPublisher;
	private final SseService sseService;

	// order 에서 사용가능한 쿠폰 리스트 불러주기
	@Transactional
	@GetMapping("/coupon")
	public ResponseEntity<?> findAllCoupon(Authentication authentication, @RequestParam Integer stoId,
		Long totalPrice) {
		String uid = authentication.getName();
		Store store = storeRepository.findById(stoId).get();
		Customer customer = (Customer)userService.findByUid(uid).get();

		List<OrderCouponResponseDto> response = new ArrayList<>();

		List<IssueCoupon> AvailableCoupons = issueCouponService.findAllAvailableCouponByToStore(store, customer);
		for (IssueCoupon issueCoupon : AvailableCoupons) {
			Boolean isAvailable = false;
			Coupon coupon = issueCoupon.getCoupon();
			if (totalPrice >= coupon.getMinOrderPrice()) {
				isAvailable = true;
			}

			OrderCouponResponseDto responseDto = OrderCouponResponseDto.builder()
				.uicId(issueCoupon.getId())
				.name(coupon.getName())
				.content(coupon.getContent())
				.expiredAt(issueCoupon.getExpiredAt())
				.discountType(coupon.getDiscountType())
				.rate(coupon.getRate())
				.minOrderPrice(coupon.getMinOrderPrice())
				.maxDiscountPrice(coupon.getMaxDiscountPrice())
				.isAvailable(isAvailable)
				.build();

			response.add(responseDto);
		}

		return new ResponseEntity<>(response, HttpStatus.OK);
	}

	// 주문 등록
	@Transactional
	@PostMapping
	public ResponseEntity<?> registerOrder(
		// Authentication authentication,
		@RequestBody OrderRequestDto request) {

		Customer customer = customerRepository.findById(request.getCusId()).get();

		// String uid = authentication.getName();
		// if (!(userService.findByUid(uid).get() instanceof Customer)) {
		// 	return new ResponseEntity<>(CommonResponseDto.builder().message("NOT_CUSTOMER").statusCode(400).build(),
		// 		HttpStatus.BAD_REQUEST);
		// }

		// 만약 입력한 포인트가 사용자가 보유한 포인트보다 많을 시에
		if (request.getUsedPoint() > customer.getPoint()) {
			return new ResponseEntity<>(OrderIdResponseDto.builder().status(400).message("POINT_NOT_ENOUTH").build(),
				HttpStatus.BAD_REQUEST);
		}

		if (request.getUicId() != null) {
			// 사용자 쿠폰 아이디로 사용 바꿔주기
			IssueCoupon coupon = issueCouponService.findById(request.getUicId()).get();
			coupon.updateIsUsed(true);
			issueCouponService.save(coupon);
		}

		// 주문 등록
		Integer ordId = orderService.saveOrder(customer, request);
		sseService.subscribe(request.getStoId().longValue(), "");

		return new ResponseEntity<>(OrderIdResponseDto.builder().ordId(ordId).status(200).message("SUCCESS").build(),
			HttpStatus.CREATED);
	}

	// STEP 02
	// 구매자 결제 성공 실패 여부
	// 주문 status 수정 및 포인트 차감 및 적립
	@Transactional
	@PatchMapping("/customer-pay")
	public ResponseEntity<?> updatePaymentStatus(Authentication authentication,
		@RequestBody PaymentRequestDto request) {
		CommonResponseDto response = CommonResponseDto.builder()
			.statusCode(200)
			.message("UPDATE_SUCCESS")
			.build();
		Order order = orderService.findById(request.getOrdId()).get();
		Customer customer = order.getCustomer();

		// 주문자가 고객이 아닐때
		String uid = authentication.getName();
		// if (!(userService.findByUid(uid).get() instanceof Customer)) {
		// 	return new ResponseEntity<>(CommonResponseDto.builder().message("NOT_CUSTOMER").statusCode(400).build(),
		// 		HttpStatus.BAD_REQUEST);
		// }

		// 주문자가 고객이지만 로그인한 유저와 같지 않을 때
		Customer LoginCustomer = (Customer)userService.findByUid(uid).get();
		if (!LoginCustomer.equals(customer)) {
			return new ResponseEntity<>(
				CommonResponseDto.builder().message("NOT_SAME_CUSTOMER").statusCode(400).build(),
				HttpStatus.BAD_REQUEST);
		}

		// regietered 상태가 아닌데 결제를 시도할 때
		if (order.getStatus() != OrderStatus.REGISTERED) {
			CommonResponseDto.builder()
				.statusCode(400)
				.message("PREVIOUS_STATUS_NOT_REGISTERED")
				.build();
			return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
		}

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
			sseService.subscribe(customer.getUsrId().longValue(), "");

			log.info("status : {}", order.getStatus());
			log.info("orderId : {}", order.getOrdId());
			eventPublisher.publishEvent(
				new OrderEvent(order, "주문이 도착했습니다."));

		} else {  // 결제 실패시
			order.updateOrderStatus(OrderStatus.PAYMENT_FAILED);

			// 쿠폰 다시 상태 안썼다는걸로 돌려주기
			if (order.getUicId() != null) {
				// 사용자 쿠폰 아이디로 사용 바꿔주기
				IssueCoupon coupon = issueCouponService.findById(order.getUicId()).get();
				coupon.updateIsUsed(false);
				issueCouponService.save(coupon);
			}

		}
		orderService.save(order);

		return new ResponseEntity<>(response, HttpStatus.OK);
	}

	//STEP 03
	// 가게 주문 수락시 프로세스 -> return도 가게로 들어가는거임
	@Transactional
	@PatchMapping("/store-acceptance/{ordId}")
	public ResponseEntity<?> updateOrderSuccess(Authentication authentication, @PathVariable Integer ordId) {
		Order order = orderService.findByOrderId(ordId).get();

//		 가게 주인이 아닐때
//		 String uid = authentication.getName();
//		 if (storeRepository.findByUid(uid).get() != order.getStore()) {
//		 	CommonResponseDto response = CommonResponseDto.builder()
//		 		.statusCode(400)
//		 		.message("NO_AUTHORIZATION")
//		 		.build();
//		 	return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
//		 }

		// 잘못된 요청일때
		if (order.getStatus() != OrderStatus.PAYMENT_COMPLETE) {
			CommonResponseDto response = CommonResponseDto.builder()
				.statusCode(400)
				.message("PREVIOUS_STATUS_NOT_PAYMENT_COMPLETE")
				.build();
			return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
		}

		OrderIdResponseDto response = OrderIdResponseDto.builder()
			.ordId(ordId)
			.status(200)
			.message("ORDER_ACCEPTED")
			.build();
		orderService.updateOrderAccepted(order);

		// 소비자로 알림 전송 : 주문 수락됨
		eventPublisher.publishEvent(new OrderEvent(order, "주문이 수락되었습니다."));

		// 쿠폰 발급
		orderService.redeemAllAvailableCouponFromStore(order);

		return new ResponseEntity<>(response, HttpStatus.OK);
	}

	// 가게 주문 거절시 프로세스
	@Transactional
	@PatchMapping("/store-denied/{ordId}")
	public ResponseEntity<?> updateOrderDenied(Authentication authentication, @PathVariable Integer ordId) {
		Order order = orderService.findByOrderId(ordId).get();

		// 가게 주인이 아닐때
		// String uid = authentication.getName();
		// if (storeRepository.findByUid(uid).get() != order.getStore()) {
		// 	CommonResponseDto response = CommonResponseDto.builder()
		// 		.statusCode(400)
		// 		.message("NO_AUTHORIZATION")
		// 		.build();
		// 	return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
		// }

		// 잘못된 요청일때
		if (order.getStatus() != OrderStatus.PAYMENT_COMPLETE) {
			CommonResponseDto response = CommonResponseDto.builder()
				.statusCode(400)
				.message("PREVIOUS_STATUS_NOT_PAYMENT_COMPLETE")
				.build();
			return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
		}

		// 쿠폰 반환
		// 쿠폰 다시 상태 안썼다는걸로 돌려주기
		if (order.getUicId() != null) {
			// 사용자 쿠폰 아이디로 사용 바꿔주기
			IssueCoupon coupon = issueCouponService.findById(order.getUicId()).get();
			coupon.updateIsUsed(false);
			issueCouponService.save(coupon);
		}

		RefundInfoResponseDto response = orderService.updateOrderDenied(order);

		// 소비자로 알림 전송 : 주문 거절됨 환불 진행
		eventPublisher.publishEvent(
			new OrderEvent(order, "주문이 거절되었습니다."));
		return new ResponseEntity<>(response, HttpStatus.OK);
	}

	// STEP 04
	// 픽업 완료시 상태변경
	@Transactional
	@PatchMapping("/store-pickup/{ordId}")
	public ResponseEntity<?> updateOrderPickup(Authentication authentication, @PathVariable Integer ordId) {
		Order order = orderService.findByOrderId(ordId).get();

		// 가게 주인이 아닐때
		// String uid = authentication.getName();
		// if (storeRepository.findByUid(uid).get() != order.getStore()) {
		// 	CommonResponseDto response = CommonResponseDto.builder()
		// 		.statusCode(400)
		// 		.message("NO_AUTHORIZATION")
		// 		.build();
		// 	return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
		// }

		// 잘못된 요청일때
		if (order.getStatus() != OrderStatus.ORDER_ACCEPT) {
			CommonResponseDto response = CommonResponseDto.builder()
				.statusCode(400)
				.message("PREVIOUS_STATUS_NOT_ORDER_ACCEPT")
				.build();
			return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
		}

		orderService.updateOrderPickup(order);
		// 소비자로 알림 전송 : 픽업 완료
		eventPublisher.publishEvent(
			new OrderEvent(order, "픽업이 완료되었습니다."));

		CommonResponseDto response = CommonResponseDto.builder()
			.statusCode(200)
			.message("UPDATE_SUCCESS")
			.build();

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

	// PAYMENT_COMPLETE, ORDER_ACCEPT 인 주문의 갯수 반환
	@GetMapping("/customer/payment-order-num")
	public ResponseEntity getPaymentAndOrderAcceptNumber(Authentication authentication) {
		String uid = authentication.getName();
		User user = userService.findByUid(uid).get();
		// if (user instanceof Store) {
		// 	return new ResponseEntity(CommonResponseDto.builder().message("ONLY_CUSTOMER").statusCode(400).build(),
		// 		HttpStatus.BAD_REQUEST);
		// }
		List<OrderStatusCountDto> cntRes = orderService.getOrderStatusCountByUser(user);

		PaymentAndOrderAcceptNumberResponseDto response = new PaymentAndOrderAcceptNumberResponseDto();
		for (OrderStatusCountDto c : cntRes) {
			System.out.println(c.getStatus() + " " + c.getCount());
			if (c.getStatus().equals(OrderStatus.PAYMENT_COMPLETE))
				response.setPaymentComplete(c.getCount().intValue());
			else if (c.getStatus().equals(OrderStatus.ORDER_ACCEPT))
				response.setOrderAccept(c.getCount().intValue());
		}

		return new ResponseEntity(response, HttpStatus.OK);
	}

	// 주문 내역 전체 조회 사용자별로
	@Transactional(readOnly = true)
	@GetMapping("/customer")
	public ResponseEntity<?> findOrderByUserId(Authentication authentication) {

		// 로그인한 유저와 주문한 사용자가 다를때
		String uid = authentication.getName();
		Customer customer = (Customer)userService.findByUid(uid).get();

		List<OrderResponseDto> response = new ArrayList<>();
		List<Optional<Order>> orders = orderService.findByCustomer(customer);

		for (Optional<Order> order : orders) {
			OrderResponseDto responseDto = orderService.findOrderById(order.get().getOrdId());
			response.add(responseDto);
		}

		return new ResponseEntity<>(response, HttpStatus.OK);
	}

	// 주문 내역 전체 조회 가게별로
	@Transactional(readOnly = true)
	@GetMapping("/store")
	public ResponseEntity<?> findOrderByStoreId(Authentication authentication) {

		// 로그인한 유저와 가게가 다를때
		String uid = authentication.getName();
		Store store = (Store)userService.findByUid(uid).get();

		List<OrderResponseDto> response = new ArrayList<>();
		List<Optional<Order>> orders = orderService.findByStore(store);

		for (Optional<Order> order : orders) {
			OrderResponseDto responseDto = orderService.findOrderById(order.get().getOrdId());
			response.add(responseDto);
		}

		return new ResponseEntity<>(response, HttpStatus.OK);
	}

}
