package com.hihi.square.domain.order.repository;

import com.hihi.square.domain.order.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface OrderRepository extends JpaRepository<Order, Integer> {

    Optional<Order> findById(Integer id);
    // 주문 조회 가게 별로
}
