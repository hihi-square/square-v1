package com.hihi.square.domain.order.event;

import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;

import com.hihi.square.domain.order.entity.Order;
import com.hihi.square.domain.order.entity.OrderStatus;
import com.hihi.square.domain.order.service.OrderService;
import com.hihi.square.domain.store.entity.Store;
import com.hihi.square.domain.user.entity.Customer;
import com.hihi.square.global.sse.SseService;
import com.hihi.square.global.sse.entity.NotificationType;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Component
@RequiredArgsConstructor
@Slf4j
public class OrderEventListener implements ApplicationListener<OrderEvent> {

	private final SseService notificationService;
	private final OrderService orderService;

	@Override
	public void onApplicationEvent(OrderEvent event) {
		Order order = event.getOrder();
		OrderStatus status = order.getStatus();
		//결제 완료 시에 가게에 알림 전송
		if (order.getStatus() == OrderStatus.PAYMENT_COMPLETE) {
			Store store = order.getStore();
			notificationService.send(store, NotificationType.READY, "order", event.getContent(),
				store.getStoreName());
		}
		//가게에서 주문 수락 or 취소 시
		else if (status == OrderStatus.ORDER_ACCEPT) {
			Customer customer = order.getCustomer();
			notificationService.send(customer, NotificationType.ACCEPT, "order", event.getContent(),
				order.getStore().getStoreName());
		} else if (status == OrderStatus.ORDER_REJECT) {
			Customer customer = order.getCustomer();
			notificationService.send(customer, NotificationType.REJECT, "order", event.getContent(),
				order.getStore().getStoreName());
		}
		//고객이 픽업을 완료했을 때
		else if (status == OrderStatus.PICKUP_COMPLETE) {
			Customer customer = order.getCustomer();
			notificationService.send(customer, NotificationType.COMPLETED, "pickup", event.getContent(),
				order.getStore().getStoreName());
		}
	}
}
