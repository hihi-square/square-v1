package com.hihi.square.domain.review.controller;

import com.hihi.square.domain.order.entity.OrderDetail;
import com.hihi.square.domain.order.service.OrderDetailService;
import com.hihi.square.domain.order.service.OrderService;
import com.hihi.square.domain.review.dto.request.ReviewWriteRequestDto;
import com.hihi.square.domain.review.service.ReviewService;
import com.hihi.square.domain.user.entity.Customer;
import com.hihi.square.domain.user.entity.User;
import com.hihi.square.domain.user.service.UserService;
import com.hihi.square.global.common.CommonResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.Optional;

@RestController
@RequestMapping("/review")
@RequiredArgsConstructor
public class ReviewController {

    private final UserService userService;
    private final OrderService orderService;
    private final ReviewService reviewService;
    private final OrderDetailService orderDetailService;

    @PostMapping
    public ResponseEntity writeReview(Authentication authentication, @RequestBody ReviewWriteRequestDto request) {
        String uid = authentication.getName();
        User user = userService.findByUid(uid).get();
        // 구매자만 리뷰 생성 가능
        if (!(user instanceof Customer)) {
            return new ResponseEntity(CommonResponseDto.builder().statusCode(400).message("ONLY_CUSTOMER_WRITE_REVIEW").build(), HttpStatus.BAD_REQUEST);
        }

        Optional<OrderDetail> optionalOrderDetail = orderDetailService.findById(request.getOrderDetailId());
        // 유효한 주문번호인지 확인
        if (optionalOrderDetail.isEmpty()){
            return new ResponseEntity(CommonResponseDto.builder().statusCode(400).message("INVALID_ORDER_ID").build(), HttpStatus.BAD_REQUEST);
        }

        OrderDetail orderDetail = optionalOrderDetail.get();
        // 내 주문만 리뷰 작성 가능
        if (!orderDetail.getOrder().getCustomer().getUid().equals(uid)){
            return new ResponseEntity(CommonResponseDto.builder().statusCode(400).message("NOT_USER_ORDER").build(), HttpStatus.BAD_REQUEST);
        }


        // 주문하고 5일 이전에만 리뷰 생성 가능
        if (orderDetail.getCreatedAt().isBefore(LocalDateTime.now().minusDays(5L))) {
            return new ResponseEntity(CommonResponseDto.builder().statusCode(400).message("CAN_WRITE_BEFORE_5DAYS").build(), HttpStatus.BAD_REQUEST);
        }
        // 리뷰가 이미 작성되었는지 확인
        if (reviewService.findByOrderDetail(orderDetail).isPresent()) {
            return new ResponseEntity(CommonResponseDto.builder().statusCode(400).message("ALREADY_WRITE_REVIEW").build(), HttpStatus.BAD_REQUEST);
        }

        reviewService.save((Customer) user, orderDetail, request);
        return new ResponseEntity(CommonResponseDto.builder().message("SUCCESS").statusCode(201).build(), HttpStatus.CREATED);

    }
}
