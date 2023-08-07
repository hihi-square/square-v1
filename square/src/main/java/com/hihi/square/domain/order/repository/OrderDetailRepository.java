package com.hihi.square.domain.order.repository;

import com.hihi.square.domain.order.entity.OrderDetail;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderDetailRepository extends JpaRepository<OrderDetail, Integer> {

    // 주문 가게 등록, 삭제, 수정, 조회
}
