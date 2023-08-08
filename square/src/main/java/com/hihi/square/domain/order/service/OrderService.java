package com.hihi.square.domain.order.service;


import com.hihi.square.domain.menu.entity.Menu;
import com.hihi.square.domain.menu.repository.MenuRepository;
import com.hihi.square.domain.order.dto.request.OrderRequestDto;
import com.hihi.square.domain.order.dto.request.OrderMenuRequestDto;
import com.hihi.square.domain.order.dto.response.OrderResponseDto;
import com.hihi.square.domain.order.dto.response.OrderMenuResponseDto;
import com.hihi.square.domain.order.entity.*;
import com.hihi.square.domain.order.repository.OrderRepository;
import com.hihi.square.domain.order.repository.OrderMenuRespository;
import com.hihi.square.domain.sale.entity.Sale;
import com.hihi.square.domain.sale.repository.SaleRepository;
import com.hihi.square.domain.store.entity.Store;
import com.hihi.square.domain.store.repository.StoreRepository;
import com.hihi.square.domain.user.entity.Customer;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class OrderService {

    private final OrderRepository orderRepository;
    private final OrderMenuRespository orderMenuRepository;
    private final StoreRepository storeRepository;
    private final MenuRepository menuRepository;
    private final SaleRepository saleRepository;

    public Integer saveOrder(Customer customer, OrderRequestDto request) {

        // Order 저장하기
        Long finalPrice = request.getTotalPrice();
        if(request.getUsedPoint() != null) {
            finalPrice -= request.getUsedPoint();
        }
        Store store = storeRepository.findById(request.getStoId()).get();

        Order order = Order.builder()
                .store(store)
                .customer(customer)
                .request(request.getRequest())
                .createdAt(LocalDateTime.now())
                .totalPrice(request.getTotalPrice())
                .usedPoint(request.getUsedPoint())
                .finalPrice(finalPrice)
                .status(OrderStatus.REGISTERED)
                .build();

        orderRepository.save(order);

        // OrderDetail 저장하기
        List<OrderMenuRequestDto> menuDto = request.getMenuList();

        for(OrderMenuRequestDto orderMenuRequestDto : menuDto) {
            saveOrderMenu(order, orderMenuRequestDto);
        }

        // point 적립을 위해 주문 PK 필요해서 넘겨주는 작업
        return order.getOrdId();
    }

    public void saveOrderMenu(Order order, OrderMenuRequestDto request) {

        OrderMenuType type = null;
        if(request.getType().equals("ME01")) { // 일반
            type = OrderMenuType.ME01;
        }
        else { // "ME02" 할인
            type = OrderMenuType.ME02;
        }

        OrderMenu orderMenu = OrderMenu.builder()
                .order(order)
                .productId(request.getProductId())
                .quantity(request.getQuantity())
                .price(request.getPrice())
                .type(type)
                .build();

        orderMenuRepository.save(orderMenu);
    }

    public Optional<Order> findById(Integer ordId) {
        return orderRepository.findById(ordId);
    }

    public OrderResponseDto findOrderById(Integer id) {
        Order order = orderRepository.findById(id).get();

        List<OrderMenu> orderMenuList = orderMenuRepository.findByOrder(order);
        List<OrderMenuResponseDto> menuList = new ArrayList<>();
        for(OrderMenu orderMenu : orderMenuList) {
            String name = "";
            OrderMenuType type = null;
            if(orderMenu.getType().equals(OrderMenuType.ME01)){
                Menu menu = menuRepository.findById(orderMenu.getProductId().longValue()).get();
                name = menu.getName();
                type = OrderMenuType.ME01;
            }
            else {
                Sale sale = saleRepository.findById(orderMenu.getProductId()).get();
                name = sale.getName();
                type = OrderMenuType.ME02;
            }

            OrderMenuResponseDto response = OrderMenuResponseDto.builder()
                    .productId(orderMenu.getProductId())
                    .type(type)
                    .menuName(name)
                    .quantity(orderMenu.getQuantity())
                    .price(orderMenu.getPrice())
                    .build();
            menuList.add(response);
        }

        OrderResponseDto orderResponse = OrderResponseDto.builder()
                .ordId(id)
                .stoId(order.getStore().getUsrId())
                .storeName(order.getStore().getStoreName())
                .storeAddress(order.getStore().getAddress())
                .storePhone(order.getStore().getPhone())
                .menuList(menuList)
                .totalPrice(order.getTotalPrice())
                .usedPoint(order.getUsedPoint())
                .finalPrice(order.getFinalPrice())
                .build();

        return orderResponse;
    }

    public void save(Order order) {
        orderRepository.save(order);
    }

    public Optional<Order> findByOrderId(Integer orderId) {
        return orderRepository.findById(orderId);
    }
}
