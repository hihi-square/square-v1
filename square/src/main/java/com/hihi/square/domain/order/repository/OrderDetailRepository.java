package com.hihi.square.domain.order.repository;

import com.hihi.square.domain.order.entity.Order;
import com.hihi.square.domain.order.entity.OrderDetail;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderDetailRepository extends JpaRepository<OrderDetail, Integer> {
    // 주문 가게 등록, 삭제, 수정, 조회

    List<OrderDetail> findByOrder(Order order);
}
