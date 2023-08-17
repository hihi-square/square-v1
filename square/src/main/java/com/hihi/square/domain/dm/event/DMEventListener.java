package com.hihi.square.domain.dm.event;

import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;

import com.hihi.square.domain.dm.entity.DM;
import com.hihi.square.domain.store.entity.Store;
import com.hihi.square.domain.user.entity.User;
import com.hihi.square.domain.user.service.UserService;
import com.hihi.square.global.sse.SseService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Component
@RequiredArgsConstructor
@Slf4j
public class DMEventListener implements ApplicationListener<DMEvent> {

	private final SseService sseService;
	private final UserService userService;

	@Override
	public void onApplicationEvent(DMEvent event) {
		log.info("DMEvent");
		DM dm = event.getDm();
		User fromUser = userService.findByUsrId(dm.getFromUser().getUsrId()).get();
		User toUser = userService.findByUsrId(dm.getToUser().getUsrId()).get();
		String data = fromUser.getNickname();

		log.info("from User : {}", dm.getFromUser());
		log.info("to User : {}", dm.getToUser());
		//가게인 경우, 가게명으로 쪽지 전송
		if (fromUser instanceof Store) {
			Store store = (Store)fromUser;
			data = store.getStoreName();
		}

		sseService.sendMessage(toUser, "message", "메시지가 도착하였습니다.",
			data, dm);
	}
}
