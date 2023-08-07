package com.hihi.square.domain.review.repository;

import com.hihi.square.domain.order.entity.Order;
import com.hihi.square.domain.order.entity.OrderDetail;
import com.hihi.square.domain.review.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ReviewRepository extends JpaRepository<Review, Integer> {

    Optional<Review> findByOrderDetail(OrderDetail orderDetail);
}
