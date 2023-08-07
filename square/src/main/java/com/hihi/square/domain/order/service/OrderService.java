package com.hihi.square.domain.order.service;

import com.hihi.square.domain.menu.entity.Menu;
import com.hihi.square.domain.menu.repository.MenuRepository;
import com.hihi.square.domain.order.dto.request.OrderDetailRequestDto;
import com.hihi.square.domain.order.dto.request.OrderMenuRequestDto;
import com.hihi.square.domain.order.dto.request.OrderRequestDto;
import com.hihi.square.domain.order.dto.response.OrderDetailResponseDto;
import com.hihi.square.domain.order.dto.response.OrderMenuResponseDto;
import com.hihi.square.domain.order.dto.response.OrderResponseDto;
import com.hihi.square.domain.order.entity.*;
import com.hihi.square.domain.order.repository.OrderDetailRepository;
import com.hihi.square.domain.order.repository.OrderMenuRespository;
import com.hihi.square.domain.order.repository.OrderRepository;
import com.hihi.square.domain.sale.entity.Associate;
import com.hihi.square.domain.sale.entity.Sale;
import com.hihi.square.domain.sale.repository.AssociateRepository;
import com.hihi.square.domain.sale.repository.SaleMenuRepository;
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

@Service
@RequiredArgsConstructor
@Transactional
public class OrderService {

    private final OrderRepository orderRepository;
    private final OrderDetailRepository orderDetailRepository;
    private final OrderMenuRespository orderMenuRepository;
    private final StoreRepository storeRepository;
    private final MenuRepository menuRepository;
    private final AssociateRepository associateRepository;
    private final SaleRepository saleRepository;

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
                .status(OrderStatus.REGISTERED)
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

        orderMenuRepository.save(orderMenu);
    }

    public Order findById(Integer ordId) {
        return orderRepository.findById(ordId).get();
    }

    public List<OrderDetail> findOrderDetailByOrder(Order order) {
        return orderDetailRepository.findByOrder(order);
    }

    public OrderResponseDto findOrderById(Integer id) {
        Order order = orderRepository.findById(id).get();
        List<OrderDetail> orderDetailList = orderDetailRepository.findByOrder(order);
        List<OrderDetailResponseDto> stores = new ArrayList<>();

        for(OrderDetail store : orderDetailList) {
            List<OrderMenuResponseDto> menuList = findMenuByOrderDetail(store);
            OrderDetailResponseDto storeDto = OrderDetailResponseDto.builder()
                    .stoId(store.getStore().getUsrId())
                    .storeAddress(store.getStore().getAddress())
                    .storePhone(store.getStore().getPhone())
                    .menuList(menuList)
                    .totalPrice(store.getTotalPrice())
                    .build();
            stores.add(storeDto);
        }
        OrderResponseDto response = OrderResponseDto.builder()
                .ordId(id)
                .stores(stores)
                .totalPrice(order.getTotalPrice())
                .usedPoint(order.getUsedPoint())
                .finalPrice(order.getFinalPrice())
                .build();

        return response;
    }

    private List<OrderMenuResponseDto> findMenuByOrderDetail(OrderDetail store) {
        List<OrderMenu> orderMenuList = orderMenuRepository.findByOrderDetail(store);
        List<OrderMenuResponseDto> menuList = new ArrayList<>();
        for(OrderMenu orderMenu : orderMenuList) {
            String name = "";
            String type = "";
            if(orderMenu.getType().equals("ME01")){
                Menu menu = menuRepository.findById(orderMenu.getProductId().longValue()).get();
                name = menu.getName();
                type = "ME01";
            }
            else if(orderMenu.getType().equals("ME02")){
                Sale sale = saleRepository.findById(orderMenu.getProductId()).get();
                name = sale.getName();
                type = "ME02";
            }
            // "ME03"
            // 아직 associate 가 없어서 발생하는 에러
//            else {
//                Associate associate = associateRepository.findById(orderMenu.getProductId()).get();
//                name = associate.getName();
//                type = "ME03";
//            }
            OrderMenuResponseDto response = OrderMenuResponseDto.builder()
                    .productId(orderMenu.getProductId())
                    .type(type)
                    .menuName(name)
                    .quantity(orderMenu.getQuantity())
                    .price(orderMenu.getPrice())
                    .build();
            menuList.add(response);
        }
        return menuList;
    }
}
