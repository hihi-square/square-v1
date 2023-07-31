package com.hihi.square.domain.order.service;

import com.hihi.square.domain.order.entity.OrderDetail;
import com.hihi.square.domain.order.repository.OrderRepository;
import com.hihi.square.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class OrderService {

    private final UserRepository userRepository;
    private final OrderRepository orderRepository;

    // 주문 정보 저장
    @Transactional
    public Integer save(OrderDetail orderDetail) {
        orderRepository.save(orderDetail);
        return orderDetail.getId();
    }

    // 주문 내역 확인 주문 아이디를 통해 주문내역 조회
    public OrderDetail findOrder(Integer id) {
        return orderRepository.findOne(id);
    }
}
