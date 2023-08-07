package com.hihi.square.domain.order.service;

import com.hihi.square.domain.order.entity.OrderDetail;
import com.hihi.square.domain.order.repository.OrderDetailRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class OrderDetailService {

    private final OrderDetailRepository orderDetailRepository;


    public Optional<OrderDetail> findById(Integer orderDetailId) {
        return orderDetailRepository.findById(orderDetailId);
    }
}
