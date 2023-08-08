package com.hihi.square.domain.review.repository;

import com.hihi.square.domain.order.entity.OrderDetail;
import com.hihi.square.domain.review.entity.Review;
import com.hihi.square.domain.store.entity.Store;
import com.hihi.square.domain.user.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ReviewRepository extends JpaRepository<Review, Integer> {

    Optional<Review> findByOrderDetail(OrderDetail orderDetail);

    List<Review> findByStoreOrderByCreatedAtDesc(Store store);

    Integer countByStoreAndRating(Store store, int rating);

    @Query("select avg(r.rating) from Review r where r.store = :store")
    Float getAverageRating(Store store);

    List<Review> findByCustomerOrderByCreatedAtDesc(Customer customer);
}
