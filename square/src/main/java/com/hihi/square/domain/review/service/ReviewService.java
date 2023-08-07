package com.hihi.square.domain.review.service;

import com.hihi.square.domain.order.entity.OrderDetail;
import com.hihi.square.domain.review.dto.request.ReviewUpdateRequestDto;
import com.hihi.square.domain.review.dto.request.ReviewWriteRequestDto;
import com.hihi.square.domain.review.dto.response.CustomerReviewListDto;
import com.hihi.square.domain.review.dto.response.StoreReviewListDto;
import com.hihi.square.domain.review.entity.Review;
import com.hihi.square.domain.review.entity.ReviewStatus;
import com.hihi.square.domain.review.repository.ReviewRepository;
import com.hihi.square.domain.store.entity.Store;
import com.hihi.square.domain.user.entity.Customer;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
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

    @Transactional
    public void deleteReview(Review review) {
        reviewRepository.delete(review);
    }

    public List<StoreReviewListDto> findByStore(Store store) {
        List<Review> reviews = reviewRepository.findByStoreOrderByCreatedAtDesc(store);
        List<StoreReviewListDto> result = new ArrayList<>();
        for(Review review : reviews) {
            result.add(StoreReviewListDto.builder()
                            .reviewId(review.getId())
                            .orderDetailId(review.getOrderDetail().getOdtId())
                            .userId(review.getCustomer().getUsrId())
                            .userNickname(review.getCustomer().getNickname())
                            .rating(review.getRating())
                            .content(review.getContent())
                            .createdAt(review.getCreatedAt())
                    .build());
        }
        return result;
    }

    public Integer[] getCountRatingList(Store store) {
        Integer[] countRatingReview = new Integer[6];
        for(int i=1;i<=5;i++){
            countRatingReview[i] = reviewRepository.countByStoreAndRating(store, i);
        }
        return countRatingReview;
    }

    public Float getAverageRating(Store store) {
        return reviewRepository.getAverageRating(store);
    }

    public List<CustomerReviewListDto> getCustomerReviewList(Customer customer) {
        List<Review> reviewList = reviewRepository.findByCustomerOrderByCreatedAtDesc(customer);
        List<CustomerReviewListDto> result = new ArrayList<>();
        for(Review review:reviewList) {
            result.add(
                    CustomerReviewListDto.builder()
                            .reviewId(review.getId())
                            .orderDetailId(review.getOrderDetail().getOdtId())
                            .storeId(review.getStore().getUsrId())
                            .storeName(review.getStore().getStoreName())
                            .rating(review.getRating())
                            .content(review.getContent())
                            .createdAt(review.getCreatedAt())
                            .build()
            );
        }
        return result;
    }
}
