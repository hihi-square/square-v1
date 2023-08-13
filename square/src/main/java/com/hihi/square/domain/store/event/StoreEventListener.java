package com.hihi.square.domain.store.event;

import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;

import com.hihi.square.domain.store.entity.Store;
import com.hihi.square.global.sse.NotificationService;
import com.hihi.square.global.sse.entity.NotificationType;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Component
@RequiredArgsConstructor
@Slf4j
public class StoreEventListener implements ApplicationListener<StoreNoticeEvent> {

	private final NotificationService notificationService;

	@Override
	public void onApplicationEvent(StoreNoticeEvent event) {
		Store store = event.getStore();
		notificationService.send(store, NotificationType.REJECT, event.getContent(),
			"/order/" + store.getUsrId());
	}
}
