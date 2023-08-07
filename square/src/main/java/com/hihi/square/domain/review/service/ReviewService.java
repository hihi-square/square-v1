package com.hihi.square.domain.review.service;

import com.hihi.square.domain.order.entity.OrderDetail;
import com.hihi.square.domain.review.dto.request.ReviewUpdateRequestDto;
import com.hihi.square.domain.review.dto.request.ReviewWriteRequestDto;
import com.hihi.square.domain.review.entity.Review;
import com.hihi.square.domain.review.entity.ReviewStatus;
import com.hihi.square.domain.review.repository.ReviewRepository;
import com.hihi.square.domain.user.entity.Customer;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ReviewService {

    private final ReviewRepository reviewRepository;

    @Transactional
    public void save(Customer customer, OrderDetail orderDetail, ReviewWriteRequestDto request) {
        Review review = Review.builder()
                .store(orderDetail.getStore())
                .orderDetail(orderDetail)
                .customer(customer)
                .rating(request.getRating())
                .content(request.getContent())
                .status(ReviewStatus.PUBLIC)
                .build();
        reviewRepository.save(review);
    }

    public Optional<Review> findByOrderDetail(OrderDetail orderDetail) {
        return reviewRepository.findByOrderDetail(orderDetail);
    }

    public Optional<Review> findById(Integer reviewId) {
        return reviewRepository.findById(reviewId);
    }
    @Transactional
    public void updateReview(Review review, ReviewUpdateRequestDto request) {
        review.updateReview(request);
        reviewRepository.save(review);
    }
}
