package com.hihi.square.domain.order.repository;

import com.hihi.square.domain.order.entity.OrderDetail;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;

@Repository
@RequiredArgsConstructor
public class OrderRepository {

    private final EntityManager em;

    // 주문 정보 db 저장
    public void save(OrderDetail orderDetail) {
        em.persist(orderDetail);
    }

    // 주문 아이디로 주문정보 상세 조회
    public OrderDetail findOne(Integer id) {
        return em.find(OrderDetail.class, id);
    }

}
