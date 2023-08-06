package com.hihi.square.domain.order.controller;

import com.hihi.square.domain.order.dto.request.OrderRequestDto;
import com.hihi.square.domain.order.entity.Order;
import com.hihi.square.domain.order.service.OrderService;
import com.hihi.square.domain.user.entity.Customer;
import com.hihi.square.domain.user.repository.CustomerRepository;
import com.hihi.square.domain.user.service.CustomerService;
import com.hihi.square.global.common.CommonResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/order")
@RequiredArgsConstructor
public class OrderController {

    private final CustomerRepository customerRepository;
    private final OrderService orderService;

    // 주문 아이디 조회 id : 주문 아이디
//    @GetMapping("/{id}")

    // 주문 등록
    @Transactional
    @PostMapping
    public ResponseEntity<CommonResponseDto> registerOrder(@RequestBody OrderRequestDto request) {
        CommonResponseDto response = CommonResponseDto.builder()
                .statusCode(201)
                .message("CREATE_SUCCESS")
                .build();
        Customer customer = customerRepository.findById(request.getCusId()).get();
        // 만약 입력한 포인트가 사용자가 보유한 포인트보다 많을 시에


        orderService.saveOrder(customer, request);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    // 주문 수정
    // 프로세스 주문내역에서 상품목록을 수정하는게 아님 결제취소 요청을 보내고
    // 프론트에서 결제가 취소되었음을 알려주면
    // OrderDetail의 상태를 모두 CANCELED로 바꿔주고
    // 사용자 포인트내역에서 사용된 usedPoint 원상복귀

    // 주문 조회


}
