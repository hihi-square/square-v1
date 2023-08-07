package com.hihi.square.domain.point.service;

import com.hihi.square.domain.order.entity.Order;
import com.hihi.square.domain.order.repository.OrderRepository;
import com.hihi.square.domain.point.dto.request.PointRegisterReqeustDto;
import com.hihi.square.domain.point.repository.PointRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PointService {

    private final PointRepository pointRepository;
    private final OrderRepository orderRepository;

//    public void save(PointRegisterReqeustDto request) {
//        Order order = orderRepository.findById(request.getOrdId()).get();
//    }

}
