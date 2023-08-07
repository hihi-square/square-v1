package com.hihi.square.domain.order.service;

import com.hihi.square.domain.menu.repository.MenuRepository;
import com.hihi.square.domain.order.dto.request.OrderDetailRequestDto;
import com.hihi.square.domain.order.dto.request.OrderMenuRequestDto;
import com.hihi.square.domain.order.dto.request.OrderRequestDto;
import com.hihi.square.domain.order.entity.*;
import com.hihi.square.domain.order.repository.OrderDetailRepository;
import com.hihi.square.domain.order.repository.OrderMenuRespository;
import com.hihi.square.domain.order.repository.OrderRepository;
import com.hihi.square.domain.store.entity.Store;
import com.hihi.square.domain.store.repository.StoreRepository;
import com.hihi.square.domain.user.entity.Customer;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class OrderService {

    private final OrderRepository orderRepository;
    private final OrderDetailRepository orderDetailRepository;
    private final OrderMenuRespository orderMenuRespository;
    private final StoreRepository storeRepository;

    public Integer saveOrder(Customer customer, OrderRequestDto request) {

        // Order 저장하기
        Long finalPrice = request.getTotalPrice();
        if(request.getUsedPoint() != null) {
            finalPrice -= request.getUsedPoint();
        }

        Order order = Order.builder()
                .customer(customer)
                .totalPrice(request.getTotalPrice())
                .createdAt(LocalDateTime.now())
                .paymentMethod(request.getPaymentMethod())
                .usedPoint(request.getUsedPoint())
                .finalPrice(finalPrice)
                .request(request.getRequest())
                .build();

        orderRepository.save(order);

        // OrderDetail 저장하기
        List<OrderDetailRequestDto> orderDetailRequestDto = request.getStores();


        for(OrderDetailRequestDto orderDetailRequest : orderDetailRequestDto) {
            saveOrderDetail(order, orderDetailRequest);
        }

        // point 적립을 위해 주문 PK 필요해서 넘겨주는 작업
        return order.getOrdId();
    }

    public void saveOrderDetail(Order order, OrderDetailRequestDto request) {
        Store store = storeRepository.findById(request.getStoId()).get();
        OrderDetail orderDetail = OrderDetail.builder()
                .order(order)
                .store(store)
                .requestDetail(request.getRequestDetail())
                .totalPrice(request.getTotalPrice())
                .createdAt(LocalDateTime.now())
                // 이거는 default 값 설정하는 물어보자
                .status(OrderStatus.COMPLETE)
                .build();

        orderDetailRepository.save(orderDetail);

        // OrderMenu 저장하기
        List<OrderMenuRequestDto> orderMenuRequestDto = request.getMenuList();

        for(OrderMenuRequestDto orderMenuRequest : orderMenuRequestDto) {
            saveOrderMenu(orderDetail, orderMenuRequest);
        }
    }

    public void saveOrderMenu(OrderDetail orderDetail, OrderMenuRequestDto request) {

        OrderMenuType type = null;
        if(request.getType().equals("ME01")) {
            type = OrderMenuType.ME01;
        }
        else if(request.getType().equals("ME02")){
            type = OrderMenuType.ME02;
        }
        else type = OrderMenuType.ME03;

        OrderMenu orderMenu = OrderMenu.builder()
                .orderDetail(orderDetail)
                .productId(request.getProductId())
                .quantity(request.getQuantity())
                .price(request.getPrice())
                .type(type)
                .build();

        orderMenuRespository.save(orderMenu);
    }
}
