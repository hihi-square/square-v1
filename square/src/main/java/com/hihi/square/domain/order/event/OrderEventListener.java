package com.hihi.square.domain.order.event;

import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;

import com.hihi.square.domain.order.entity.Order;
import com.hihi.square.domain.order.entity.OrderStatus;
import com.hihi.square.domain.store.entity.Store;
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
		// OrderEvent가 발생하면 여기서 알림 전송 로직을 처리합니다.
		// 예를 들어, 결제 완료 시에만 알림을 전송하고 싶다면 아래와 같이 처리할 수 있습니다.
		if (order.getStatus() == OrderStatus.PAYMENT_COMPLETE) {
			Store store = order.getStore();

			// OrderResponseDto orderResponseDto =
			notificationService.send(store, NotificationType.READY, "주문이 도착했어요.", null);
		}
	}
}
