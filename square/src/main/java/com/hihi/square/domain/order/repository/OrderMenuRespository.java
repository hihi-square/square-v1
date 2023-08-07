package com.hihi.square.domain.order.repository;

import com.hihi.square.domain.order.entity.OrderDetail;
import com.hihi.square.domain.order.entity.OrderMenu;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderMenuRespository extends JpaRepository<OrderMenu, Integer> {
    List<OrderMenu> findByOrderDetail(OrderDetail orderDetail);
    // 주문 메뉴 등록, 삭제, 수정, 조회

}
