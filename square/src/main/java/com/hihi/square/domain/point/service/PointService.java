package com.hihi.square.domain.point.service;

import com.hihi.square.domain.order.entity.Order;
import com.hihi.square.domain.order.repository.OrderRepository;
import com.hihi.square.domain.point.dto.response.PointInfoResponseDto;
import com.hihi.square.domain.point.dto.response.PointResponseDto;
import com.hihi.square.domain.point.entity.Point;
import com.hihi.square.domain.point.repository.PointRepository;
import com.hihi.square.domain.user.entity.Customer;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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

    public List<Optional<Point>> findAllPointByCustomer(Customer customer) {
        return pointRepository.findAllByCustomer(customer);
    }

    public PointInfoResponseDto getPointInfo(Customer customer) {

        List<Optional<Point>> pointList = findAllPointByCustomer(customer);
        Integer size = pointList.size();

        if(size==0) {
            return PointInfoResponseDto.builder()
                    .totalPoint(customer.getPoint())
                    .name(customer.getName())
                    .count(0)
                    .build();
        }

        List<PointResponseDto> points = new ArrayList<>();

        for(Optional<Point> p : pointList) {
            if(p.get().getAmount() != 0) {
                String formatDate = p.get().getCreatedAt().format(DateTimeFormatter.ofPattern("yyyy.MM.dd"));

                PointResponseDto pointDto = PointResponseDto.builder()
                        .pointId(p.get().getUpo_id())
                        .createAt(formatDate)
                        .storeName(p.get().getOrder().getStore().getStoreName())
                        .type(p.get().getType())
                        .point(p.get().getAmount())
                        .build();
                points.add(pointDto);
            }
        }

        PointInfoResponseDto response = PointInfoResponseDto.builder()
                .totalPoint(customer.getPoint())
                .name(customer.getName())
                .count(size)
                .pointList(points)
                .build();

        return response;

    }
}
