package com.hihi.square.domain.point.service;

import com.hihi.square.domain.order.entity.Order;
import com.hihi.square.domain.order.repository.OrderRepository;
import com.hihi.square.domain.point.entity.Point;
import com.hihi.square.domain.point.repository.PointRepository;
import com.hihi.square.domain.user.entity.Customer;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class PointService {

    private final PointRepository pointRepository;
    private final OrderRepository orderRepository;

    public void save(Integer ordId, Customer customer, Long usedPoint, Integer type) {
        Order order = orderRepository.findById(ordId).get();

        Point point = Point.builder()
                .order(order)
                .customer(customer)
                .amount(usedPoint)
                .createdAt(LocalDateTime.now())
                .type(type)
                .build();

        pointRepository.save(point);

    }

//    public void save(PointRegisterReqeustDto request) {
//        Order order = orderRepository.findById(request.getOrdId()).get();
//    }

}
