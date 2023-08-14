package com.hihi.square.domain.review.controller;

import com.hihi.square.domain.order.entity.Order;
import com.hihi.square.domain.order.service.OrderService;
import com.hihi.square.domain.review.dto.request.ReviewUpdateRequestDto;
import com.hihi.square.domain.review.dto.request.ReviewWriteRequestDto;
import com.hihi.square.domain.review.dto.response.CustomerReviewListDto;
import com.hihi.square.domain.review.dto.response.CustomerReviewListResponseDto;
import com.hihi.square.domain.review.dto.response.StoreReviewListDto;
import com.hihi.square.domain.review.dto.response.StoreReviewListResponseDto;
import com.hihi.square.domain.review.entity.Review;
import com.hihi.square.domain.review.service.ReviewService;
import com.hihi.square.domain.store.entity.Store;
import com.hihi.square.domain.user.entity.Customer;
import com.hihi.square.domain.user.entity.User;
import com.hihi.square.domain.user.service.UserService;
import com.hihi.square.global.common.CommonResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/review")
@RequiredArgsConstructor
public class ReviewController {

    private final UserService userService;
    private final OrderService orderService;
    private final ReviewService reviewService;

    // 리뷰 작성
    @PostMapping
    public ResponseEntity writeReview(Authentication authentication, @RequestBody ReviewWriteRequestDto request) {
        String uid = authentication.getName();
        User user = userService.findByUid(uid).get();
        // 구매자만 리뷰 생성 가능
        if (!(user instanceof Customer)) {
            return new ResponseEntity(CommonResponseDto.builder().statusCode(400).message("ONLY_CUSTOMER_WRITE_REVIEW").build(), HttpStatus.BAD_REQUEST);
        }

        Optional<Order> optionalOrder = orderService.findById(request.getOrderId());
        // 유효한 주문번호인지 확인
        if (optionalOrder.isEmpty()){
            return new ResponseEntity(CommonResponseDto.builder().statusCode(400).message("INVALID_ORDER_ID").build(), HttpStatus.BAD_REQUEST);
        }

        Order order = optionalOrder.get();
        // 내 주문만 리뷰 작성 가능
        if (!order.getCustomer().getUid().equals(uid)){
            return new ResponseEntity(CommonResponseDto.builder().statusCode(400).message("NOT_USER_ORDER").build(), HttpStatus.BAD_REQUEST);
        }

        // 주문하고 5일 이전에만 리뷰 생성 가능
        if (order.getCreatedAt().isBefore(LocalDateTime.now().minusDays(5L))) {
            return new ResponseEntity(CommonResponseDto.builder().statusCode(400).message("CAN_WRITE_BEFORE_5DAYS").build(), HttpStatus.BAD_REQUEST);
        }
        // 리뷰가 이미 작성되었는지 확인
        if (reviewService.findByOrder(order).isPresent()) {
            return new ResponseEntity(CommonResponseDto.builder().statusCode(400).message("ALREADY_WRITE_REVIEW").build(), HttpStatus.BAD_REQUEST);
        }
        // 리뷰는 1 ~ 5만 가능
        if (request.getRating() < 1 || request.getRating() > 5) {
            return new ResponseEntity(CommonResponseDto.builder().statusCode(400).message("RATING_IS_1TO5").build(), HttpStatus.BAD_REQUEST);
        }

        reviewService.save((Customer) user, order, request);
        return new ResponseEntity(CommonResponseDto.builder().message("SUCCESS").statusCode(201).build(), HttpStatus.CREATED);

    }
    
    // 리뷰 수정
    @PatchMapping
    public ResponseEntity updateReview(Authentication authentication, @RequestBody ReviewUpdateRequestDto request) {
        String uid = authentication.getName();
        User user = userService.findByUid(uid).get();
        // 구매자만 리뷰 생성 가능
        if (!(user instanceof Customer)) {
            return new ResponseEntity(CommonResponseDto.builder().statusCode(400).message("ONLY_CUSTOMER_WRITE_REVIEW").build(), HttpStatus.BAD_REQUEST);
        }
        Optional<Review> optionalReview = reviewService.findById(request.getReviewId());
        // 유효하지 않은 리뷰 번호
        if(optionalReview.isEmpty()){
            return new ResponseEntity(CommonResponseDto.builder().statusCode(400).message("INVALID_REVIEW_ID").build(), HttpStatus.BAD_REQUEST);
        }
        Review review = optionalReview.get();
        // 자신의 리뷰만 수정 가능
        if (!review.getCustomer().getUid().equals(uid)) {
            return new ResponseEntity(CommonResponseDto.builder().statusCode(400).message("NOT_MY_REVIEW").build(), HttpStatus.BAD_REQUEST);
        }
        // 리뷰는 1 ~ 5만 가능
        if (request.getRating() < 1 || request.getRating() > 5) {
            return new ResponseEntity(CommonResponseDto.builder().statusCode(400).message("RATING_IS_1TO5").build(), HttpStatus.BAD_REQUEST);
        }
        reviewService.updateReview(review, request);
        return new ResponseEntity(CommonResponseDto.builder().statusCode(200).message("SUCCESS").build(), HttpStatus.OK);
    }

    // 리뷰 삭제
    @DeleteMapping("/{id}")
    public ResponseEntity deleteReview(Authentication authentication, @PathVariable("id") Integer reviewId) {
        String uid = authentication.getName();
        User user = userService.findByUid(uid).get();
        // 구매자만 리뷰 생성 가능
        if (!(user instanceof Customer)) {
            return new ResponseEntity(CommonResponseDto.builder().statusCode(400).message("ONLY_CUSTOMER_WRITE_REVIEW").build(), HttpStatus.BAD_REQUEST);
        }
        Optional<Review> optionalReview = reviewService.findById(reviewId);
        // 유효하지 않은 리뷰 번호
        if(optionalReview.isEmpty()){
            return new ResponseEntity(CommonResponseDto.builder().statusCode(400).message("INVALID_REVIEW_ID").build(), HttpStatus.BAD_REQUEST);
        }
        Review review = optionalReview.get();
        // 자신의 리뷰만 수정 가능
        if (!review.getCustomer().getUid().equals(uid)) {
            return new ResponseEntity(CommonResponseDto.builder().statusCode(400).message("NOT_MY_REVIEW").build(), HttpStatus.BAD_REQUEST);
        }
        reviewService.deleteReview(review);
        return new ResponseEntity(CommonResponseDto.builder().statusCode(200).message("SUCCESS").build(), HttpStatus.OK);
    }

    // 가게 리뷰 리스트
    @GetMapping("/{id}")
    public ResponseEntity getStoreReviews(@PathVariable("id") Integer storeId) {
        Optional<User> optionalUser = userService.findByUsrId(storeId);
        // 존재하지 않는 아이디
        if (optionalUser.isEmpty()) {
            return new ResponseEntity(CommonResponseDto.builder().statusCode(400).message("INVALID_STORE_ID").build(), HttpStatus.BAD_REQUEST);
        }
        // 구매자 회원인 경우
        if (optionalUser.get() instanceof Customer) {
            return new ResponseEntity(CommonResponseDto.builder().statusCode(400).message("ONLY_VIEW_STORE_ID").build(), HttpStatus.BAD_REQUEST);
        }
        Store store = (Store) optionalUser.get();
        List<StoreReviewListDto> reviewList = reviewService.findByStore(store);
        Integer[] reviewRatingCount = reviewService.getCountRatingList(store);
        Float averageRating = reviewService.getAverageRating(store);
        return new ResponseEntity(StoreReviewListResponseDto.builder()
                .statusCode(200)
                .averageRating(averageRating)
                .reviews(reviewList)
                .reviewRateCount(reviewRatingCount)
                .build(),
                HttpStatus.OK
        );
    }

    // 내 리뷰 리스트
    @GetMapping
    public ResponseEntity getMyReviews(Authentication authentication){
        String uid = authentication.getName();
        User user = userService.findByUid(uid).get();
        // 구매자만 리뷰 생성 가능
        if (!(user instanceof Customer)) {
            return new ResponseEntity(CommonResponseDto.builder().statusCode(400).message("ONLY_CUSTOMER_WRITE_REVIEW").build(), HttpStatus.BAD_REQUEST);
        }
        Customer customer = (Customer) user;
        List<CustomerReviewListDto> reviews = reviewService.getCustomerReviewList(customer);
        return new ResponseEntity(CustomerReviewListResponseDto.builder().statusCode(200).reviews(reviews).build(), HttpStatus.OK);
    }

}
