package com.hihi.square.domain.order.event;

import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;

import com.hihi.square.domain.order.entity.Order;
import com.hihi.square.domain.order.entity.OrderStatus;
import com.hihi.square.domain.store.entity.Store;
import com.hihi.square.domain.user.entity.Customer;
import com.hihi.square.global.sse.NotificationService;
import com.hihi.square.global.sse.entity.NotificationType;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Component
@RequiredArgsConstructor
@Slf4j
public class OrderEventListener implements ApplicationListener<OrderEvent> {

	private final NotificationService notificationService;

	@Override
	public void onApplicationEvent(OrderEvent event) {
		Order order = event.getOrder();
		OrderStatus status = order.getStatus();
		//결제 완료 시에 가게에 알림 전송
		if (order.getStatus() == OrderStatus.PAYMENT_COMPLETE) {
			Store store = order.getStore();
			notificationService.send(store, NotificationType.READY, event.getContent(), "/order/" + order.getOrdId());
		}
		//가게에서 주문 수락 or 취소 시
		else if (status == OrderStatus.ORDER_ACCEPT) {
			Customer customer = order.getCustomer();
			notificationService.send(customer, NotificationType.ACCEPT, event.getContent(),
				"/order/" + order.getOrdId());
		} else if (status == OrderStatus.ORDER_REJECT) {
			Customer customer = order.getCustomer();
			notificationService.send(customer, NotificationType.REJECT, event.getContent(),
				"/order/" + order.getOrdId());
		}
		//고객이 픽업을 완료했을 때
		// else if (status == OrderStatus.PICKUP_COMPLETE) {
		// 	Customer customer = order.getCustomer();
		// 	notificationService.send(customer, NotificationType.READY, event.getContent(),
		// 		"/order/" + order.getOrdId());
		// }
	}
}
