package com.hihi.square.domain.order.controller;

import com.hihi.square.domain.order.entity.OrderDetail;
import com.hihi.square.domain.order.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/order")
public class OrderController {

    private final OrderService orderService;

    @PostMapping
    public ResponseEntity<Object> saveOrder(@RequestBody OrderDetail orderDetail) {
        orderService.save(orderDetail);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
