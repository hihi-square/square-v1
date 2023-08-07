package com.hihi.square.domain.order.controller;

import com.hihi.square.domain.order.dto.request.OrderRequestDto;
import com.hihi.square.domain.order.dto.request.PaymentRequestDto;
import com.hihi.square.domain.order.dto.response.OrderIdResponseDto;
import com.hihi.square.domain.order.dto.response.OrderResponseDto;
import com.hihi.square.domain.order.entity.Order;
import com.hihi.square.domain.order.entity.OrderDetail;
import com.hihi.square.domain.order.entity.OrderStatus;
import com.hihi.square.domain.order.service.OrderService;
import com.hihi.square.domain.point.service.PointService;
import com.hihi.square.domain.user.entity.Customer;
import com.hihi.square.domain.user.repository.CustomerRepository;
import com.hihi.square.global.common.CommonResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/order")
@RequiredArgsConstructor
public class OrderController {

    private final CustomerRepository customerRepository;
    private final OrderService orderService;
    private final PointService pointService;

    // 주문 아이디 조회 id : 주문 아이디
//    @GetMapping("/{id}")

    // 주문 등록
    @Transactional
    @PostMapping
    public ResponseEntity<OrderIdResponseDto> registerOrder(@RequestBody OrderRequestDto request) {
        Customer customer = customerRepository.findById(request.getCusId()).get();
        // 만약 입력한 포인트가 사용자가 보유한 포인트보다 많을 시에
        if(request.getUsedPoint() > customer.getPoint()) {
            return new ResponseEntity<>(OrderIdResponseDto.builder().status(400).message("POINT_NOT_ENOUTH").build(), HttpStatus.BAD_REQUEST);
        }

        // 주문 등록
        Integer ordId = orderService.saveOrder(customer, request);
        if(request.getUsedPoint() > 0) {
            // 주문 등록되자마자 포인트 차감
            pointService.save(ordId, customer, request.getUsedPoint(), 0);
            // customer객체에 포인트 반영
            customer.updatePoint(customer.getPoint() - request.getUsedPoint());
            // db 수정
            customerRepository.save(customer);
        }

        return new ResponseEntity<>(OrderIdResponseDto.builder().ordId(ordId).status(200).message("SUCCESS").build(), HttpStatus.CREATED);
    }

    // 구매자 결제 성공 실패 여부
    // 주문 status 수정 및 포인트 차감 및 적립
    @Transactional
    @PatchMapping("/customer-pay")
    public ResponseEntity<CommonResponseDto> updatePaymentStatus(@RequestBody PaymentRequestDto request) {
        CommonResponseDto response = CommonResponseDto.builder()
                .statusCode(200)
                .message("UPDATE_SUCCESS")
                .build();
        Order order = orderService.findById(request.getOrdId());
        Customer customer = order.getCustomer();

        List< OrderDetail> stores = orderService.findOrderDetailByOrder(order);
        // 결제 성공시
        if(request.getPaymentSuccess()) {
            for(OrderDetail store : stores) {
                store.updateOrderStatus(OrderStatus.PAYMENT_COMPLETE);
            }
        }
        else {
            for(OrderDetail store : stores) {
                store.updateOrderStatus(OrderStatus.PAYMENT_FAILED);
            }
            if(order.getUsedPoint() > 0) {
                // 포인트 원상복귀
                pointService.save(order.getOrdId(), customer, order.getUsedPoint(), 1);
                // 객체 수정
                customer.updatePoint(customer.getPoint() + order.getUsedPoint());
                // db 저장
                customerRepository.save(customer);
            }
        }
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // 가게 마다 주문 체결 내역 전송
    ///... 내일 갓펭소님과 지희공주랑 상의후 만들도록 하겟숨...ㅠㅠㅠㅠ 자고싶어 하지만 안되 오다희 정신차려.......

    // 주문 상세 조회
    @Transactional
    @GetMapping("/{id}")
    public ResponseEntity<?> findOrderById(@PathVariable Integer id) {
        OrderResponseDto response = orderService.findOrderById(id);
        // 사용자 아이디가 일치하지 않을 시 메소드 추가
        return new ResponseEntity<>(response, HttpStatus.OK);
    }


}
