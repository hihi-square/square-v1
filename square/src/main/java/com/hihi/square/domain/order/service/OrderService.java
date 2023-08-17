package com.hihi.square.domain.order.service;


import com.hihi.square.domain.coupon.entity.Coupon;
import com.hihi.square.domain.coupon.service.CouponService;
import com.hihi.square.domain.coupon.service.IssueCouponService;
import com.hihi.square.domain.menu.entity.Menu;
import com.hihi.square.domain.menu.repository.MenuRepository;
import com.hihi.square.domain.order.dto.request.OrderRequestDto;
import com.hihi.square.domain.order.dto.request.OrderMenuRequestDto;
import com.hihi.square.domain.order.dto.response.OrderResponseDto;
import com.hihi.square.domain.order.dto.response.OrderMenuResponseDto;
import com.hihi.square.domain.order.dto.response.OrderStatusCountDto;
import com.hihi.square.domain.order.dto.response.PaymentAndOrderAcceptNumberResponseDto;
import com.hihi.square.domain.order.dto.response.RefundInfoResponseDto;
import com.hihi.square.domain.order.entity.*;
import com.hihi.square.domain.order.repository.OrderRepository;
import com.hihi.square.domain.order.repository.OrderMenuRespository;
import com.hihi.square.domain.point.service.PointService;
import com.hihi.square.domain.review.service.ReviewService;
import com.hihi.square.domain.sale.entity.Sale;
import com.hihi.square.domain.sale.repository.SaleRepository;
import com.hihi.square.domain.store.entity.Store;
import com.hihi.square.domain.store.repository.StoreRepository;
import com.hihi.square.domain.user.entity.Customer;
import com.hihi.square.domain.user.entity.User;
import com.hihi.square.domain.user.entity.UserRankType;
import com.hihi.square.domain.user.repository.CustomerRepository;
import com.hihi.square.domain.user.service.CustomerService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class OrderService {

    private final OrderRepository orderRepository;
    private final OrderMenuRespository orderMenuRepository;
    private final StoreRepository storeRepository;
    private final MenuRepository menuRepository;
    private final SaleRepository saleRepository;
    private final PointService pointService;
    private final CustomerRepository customerRepository;
    private final CouponService couponService;
    private final IssueCouponService issueCouponService;
    private final ReviewService reviewService;

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

        Boolean review = reviewService.existReviewByOrder(order);
        Boolean reviewable = false;
        LocalDateTime limit = LocalDateTime.now().minusDays(5);

        // 만약 리뷰가 없으면 리뷰어블 true
        // 상세조건 주문이 5일 안쪽이면
        if(!review && order.getCreatedAt().isAfter(limit)) {
            reviewable = true;
        }

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
                .status(order.getStatus())
                .createdAt(order.getCreatedAt())
                .review(reviewable)
                .build();

        return orderResponse;
    }

    public void save(Order order) {
        orderRepository.save(order);
    }

    public Optional<Order> findByOrderId(Integer orderId) {
        return orderRepository.findById(orderId);
    }

    public List<Optional<Order>> findByCustomer(Customer customer) {
        return orderRepository.findByCustomerOrderByCreatedAtDesc(customer);
    }

    public List<Optional<Order>> findByStore(Store store) {
        return orderRepository.findByStoreOrderByCreatedAtDesc(store);
    }

    public void updateOrderAccepted(Order order) {
        // 상태 변경
        order.updateOrderStatus(OrderStatus.ORDER_ACCEPT);
        orderRepository.save(order);
    }

    public RefundInfoResponseDto updateOrderDenied(Order order) {
        Customer customer = order.getCustomer();

        // 포인트 반환
        pointService.save(order.getOrdId(), customer, order.getUsedPoint(), 1);
        customer.updatePoint(customer.getPoint() + order.getUsedPoint());

        // 상태 변경
        order.updateOrderStatus(OrderStatus.ORDER_REJECT);

        // 결제 취소
        RefundInfoResponseDto response = RefundInfoResponseDto.builder()
                .ordId(order.getOrdId())
                .payment(order.getPaymentMethod())
                .finalPrice(order.getFinalPrice())
                .orderStatus(order.getStatus())
                .build();

        customerRepository.save(customer);
        orderRepository.save(order);

        return response;
    }

    public void updateOrderPickup(Order order) {
        Customer customer = order.getCustomer();

        // rank 반영
        Integer orderCount = orderRepository.countOrderByCustomerAndCreatedAtBetween(customer, LocalDateTime.now().minusDays(30), LocalDateTime.now());
        Integer earningRate = 0;
        if(orderCount >= 30) {
            customer.updateRank(UserRankType.UR04);
            earningRate = 5;
        }
        else if(orderCount >= 15) {
            customer.updateRank(UserRankType.UR03);
            earningRate = 3;
        }
        else if(orderCount >= 5) {
            customer.updateRank(UserRankType.UR02);
            earningRate = 1;
        }
        else{
            customer.updateRank(UserRankType.UR01);
        }

        // 포인트 적립
        if(earningRate != 0) {
            Long point = order.getFinalPrice() / 100 * earningRate;  // rank 에 따라 상이한 적립금액
            pointService.save(order.getOrdId(), customer, point, 1);
            customer.updatePoint(customer.getPoint() + point);
        }

        // 상태 변경
        order.updateOrderStatus(OrderStatus.PICKUP_COMPLETE);
        orderRepository.save(order);
        customerRepository.save(customer);
    }

    public void redeemAllAvailableCouponFromStore(Order order) {
        List<Coupon> couponList = couponService.findAllAvailableCouponByFromStore(order.getStore());

        for(Coupon coupon : couponList) {
            // 발급 안된 쿠폰이면 + 어짜피 위에서 유효기간 걸러줌
            if(issueCouponService.isAlreadyIssued(order.getCustomer(), coupon)) continue;
            if(order.getTotalPrice() > coupon.getIssueCondition()){
                issueCouponService.issueCoupon(order.getCustomer(), coupon);
            }
        }
    }

	public List<OrderStatusCountDto> getOrderStatusCountByUser(User user) {
        return orderRepository.findPaymentAndOrderAcceptNumberByUser((Customer) user);
	}
}
