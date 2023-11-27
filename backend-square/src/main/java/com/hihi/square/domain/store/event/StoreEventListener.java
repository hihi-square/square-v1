package com.hihi.square.domain.store.event;

import java.util.List;

import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;

import com.hihi.square.domain.store.entity.Notice;
import com.hihi.square.domain.user.entity.User;
import com.hihi.square.global.sse.SseService;
import com.hihi.square.global.sse.entity.NotificationType;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Component
@RequiredArgsConstructor
@Slf4j
public class StoreEventListener implements ApplicationListener<StoreNoticeEvent> {
	private final SseService notificationService;

	@Override
	public void onApplicationEvent(StoreNoticeEvent event) {
		Notice notice = event.getNotice();
		List<User> userList = event.getUserList();

		//찜한 고객들에게 알림 전송
		for (User user : userList) {
			notificationService.send(user, NotificationType.REJECT, "notice", event.getContent(),
				"/store/daily/" + notice.getSnoId());
		}
	}
}
