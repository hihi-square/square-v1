package com.hihi.square.global.sse;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import com.hihi.square.domain.menu.dto.response.CommonResponseDto;
import com.hihi.square.domain.user.entity.User;
import com.hihi.square.domain.user.service.UserService;
import com.hihi.square.global.sse.dto.NotificationResponseDto;
import com.hihi.square.global.sse.entity.Notification;
import com.hihi.square.global.sse.entity.NotificationType;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/notification")
public class SseController {
	private final SseService notificationService;
	private final UserService userService;

	// @ApiOperation(value = "알림 구독", notes = "알림을 구독한다.")
	@GetMapping(value = "/subscribe", produces = "text/event-stream")
	@ResponseStatus(HttpStatus.OK)
	public SseEmitter subscribe(Authentication authentication,
		@RequestHeader(value = "Last-Event-ID", required = false, defaultValue = "") String lastEventId,
		@RequestHeader String type) {
		String uName = authentication.getName();
		//UserId Integer -> Long type으로 변경 필요
		Long userId = userService.findByUid(uName).get().getUsrId().longValue();
		return notificationService.subscribe(userId, lastEventId, type);
	}

	//알림 전체 조회
	@GetMapping("/all")
	public ResponseEntity<CommonResponseDto<?>> getAllNotification() {
		List<Notification> notificationList = notificationService.findAll();
		List<NotificationResponseDto> responseList = new ArrayList<>();
		for (Notification notification : notificationList) {
			responseList.add(new NotificationResponseDto(notification));
		}

		return ResponseEntity.ok(CommonResponseDto.success(responseList));
	}

	//알림 전송
	@PostMapping("/send-data/{userId}")
	public void sendData(@PathVariable Integer userId) {
		User user = userService.findByUsrId(userId).get();
		// User user = userService.findByUid(name).get();
		notificationService.send(user, NotificationType.READY, "test", "message", "data");
	}
}