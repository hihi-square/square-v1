package com.hihi.square.domain.review.service;

import com.hihi.square.domain.image.entity.Image;
import com.hihi.square.domain.image.respository.ImageRepository;
import com.hihi.square.domain.order.entity.Order;
import com.hihi.square.domain.review.dto.request.ReviewUpdateRequestDto;
import com.hihi.square.domain.review.dto.request.ReviewWriteRequestDto;
import com.hihi.square.domain.review.dto.response.CustomerReviewListDto;
import com.hihi.square.domain.review.dto.response.StoreReviewListDto;
import com.hihi.square.domain.review.entity.Review;
import com.hihi.square.domain.review.entity.ReviewStatus;
import com.hihi.square.domain.review.repository.ReviewRepository;
import com.hihi.square.domain.store.entity.Store;
import com.hihi.square.domain.user.entity.Customer;
import com.hihi.square.global.s3.dto.FileThumbDto;
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
    private final ImageRepository imageRepository;

    @Transactional
    public void save(Customer customer, Order order, ReviewWriteRequestDto request) {
        Review review = Review.builder()
                .store(order.getStore())
                .order(order)
                .customer(customer)
                .rating(request.getRating())
                .content(request.getContent())
                .status(ReviewStatus.PUBLIC)
                .build();
        reviewRepository.save(review);
        List<FileThumbDto> images = request.getImages();
        for(int i=0;i<images.size();i++){
            FileThumbDto image = images.get(i);
            imageRepository.save(
                    Image.builder()
                            .url(image.getUrl())
                            .order(i)
                            .type("REVIEW")
                            .connectedId(review.getId())
                            .thumbnail(image.getThumb())
                            .build()
            );
        }
    }

    public Optional<Review> findByOrder(Order order) {
        return reviewRepository.findByOrder(order);
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
        imageRepository.deleteByTypeAndConnectedId("REVIEW", review.getId());
        reviewRepository.delete(review);

    }

    public List<StoreReviewListDto> findByStore(Store store) {
        List<Review> reviews = reviewRepository.findByStoreOrderByCreatedAtDesc(store);
        List<StoreReviewListDto> result = new ArrayList<>();
        for(Review review : reviews) {
            List<Image> imageList = imageRepository.findAllByTypeAndConnectedId("REVIEW", review.getId());
            List<FileThumbDto> images = new ArrayList<>();
            for(Image image : imageList) {
                images.add(
                        FileThumbDto.builder().url(image.getUrl()).thumb(image.getThumbnail()).build()
                );
            }
            result.add(StoreReviewListDto.builder()
                            .reviewId(review.getId())
                            .orderId(review.getOrder().getOrdId())
                            .userId(review.getCustomer().getUsrId())
                            .userNickname(review.getCustomer().getNickname())
                            .rating(review.getRating())
                            .content(review.getContent())
                            .createdAt(review.getCreatedAt())
                            .images(images)
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
        Float result = reviewRepository.getAverageRating(store);
        return result == null ? 0 : result;
    }

    public List<CustomerReviewListDto> getCustomerReviewList(Customer customer) {
        List<Review> reviewList = reviewRepository.findByCustomerOrderByCreatedAtDesc(customer);
        List<CustomerReviewListDto> result = new ArrayList<>();
        for(Review review:reviewList) {
            List<Image> imageList = imageRepository.findAllByTypeAndConnectedId("REVIEW", review.getId());
            List<FileThumbDto> images = new ArrayList<>();
            for(Image image : imageList) {
                images.add(
                        FileThumbDto.builder().url(image.getUrl()).thumb(image.getThumbnail()).build()
                );
            }
            result.add(
                    CustomerReviewListDto.builder()
                            .reviewId(review.getId())
                            .orderId(review.getOrder().getOrdId())
                            .storeId(review.getStore().getUsrId())
                            .storeName(review.getStore().getStoreName())
                            .rating(review.getRating())
                            .content(review.getContent())
                            .createdAt(review.getCreatedAt())
                            .images(images)
                            .build()
            );
        }
        return result;
    }

    public Boolean existReviewByOrder(Order order) {
        return reviewRepository.existsReviewByOrder(order);
    }
}
