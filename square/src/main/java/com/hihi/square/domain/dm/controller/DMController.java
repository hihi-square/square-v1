package com.hihi.square.domain.dm.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.context.ApplicationEventPublisher;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.hihi.square.domain.dm.dto.request.DMRequestDto;
import com.hihi.square.domain.dm.dto.response.DMResponseDto;
import com.hihi.square.domain.dm.entity.DM;
import com.hihi.square.domain.dm.event.DMEvent;
import com.hihi.square.domain.dm.service.DMService;
import com.hihi.square.domain.menu.dto.response.CommonResponseDto;
import com.hihi.square.domain.user.entity.User;
import com.hihi.square.domain.user.service.UserService;
import com.hihi.square.global.sse.SseService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Controller
@RequestMapping("/dm")
@RequiredArgsConstructor
@Slf4j
public class DMController {
	private final DMService dmService;
	private final UserService userService;
	private final SseService sseService;
	private final ApplicationEventPublisher eventPublisher;

	//받은 쪽지 목록 보기
	@GetMapping("/get")
	public ResponseEntity<CommonResponseDto<?>> getMessages(Authentication authentication) {
		String usrName = authentication.getName();
		User user = userService.findByUid(usrName).get();

		List<DM> dmList = dmService.findGetMessageList(user);
		List<DMResponseDto> responseList = new ArrayList<>();
		for (DM dm : dmList) {
			responseList.add(new DMResponseDto(dm));
		}

		return ResponseEntity.ok(CommonResponseDto.success(responseList));
	}

	//보낸 쪽지 목록 보기
	@GetMapping("/send")
	public ResponseEntity<CommonResponseDto<?>> getSendMessages(Authentication authentication) {
		String usrName = authentication.getName();
		User user = userService.findByUid(usrName).get();

		List<DM> dmList = dmService.findSendMessageList(user);
		List<DMResponseDto> responseList = new ArrayList<>();
		for (DM dm : dmList) {
			responseList.add(new DMResponseDto(dm));
		}

		return ResponseEntity.ok(CommonResponseDto.success(responseList));
	}

	//받은 쪽지 상세 보기
	@GetMapping("/get/{dmId}")
	public ResponseEntity<CommonResponseDto<?>> getMessage(Authentication authentication,
		@PathVariable Long dmId) {
		String usrName = authentication.getName();
		User user = userService.findByUid(usrName).get();

		DM dm = dmService.findGetMessageDetail(user, dmId);
		return ResponseEntity.ok(CommonResponseDto.success(new DMResponseDto(dm)));
	}

	//보낸 쪽지 상세 보기
	@GetMapping("/send/{dmId}")
	public ResponseEntity<CommonResponseDto<?>> getSendMessageDetail(Authentication authentication,
		@PathVariable Long dmId) {
		String usrName = authentication.getName();
		User user = userService.findByUid(usrName).get();

		DM dm = dmService.findSendMessageDetail(user, dmId);
		return ResponseEntity.ok(CommonResponseDto.success(new DMResponseDto(dm)));
	}

	//쪽지 보내기 -> front에서 받는 사람 구독 필요
	@PostMapping
	public ResponseEntity<CommonResponseDto<?>> sendMessage(Authentication authentication, @RequestBody
	DMRequestDto dmWriteRequestDto) {
		String usrName = authentication.getName();
		User user = userService.findByUid(usrName).get();

		dmWriteRequestDto.setFromId(user.getUsrId());
		DM dm = dmService.sendMessage(dmWriteRequestDto);

		//쪽지 보내기 -> sse
		eventPublisher.publishEvent(new DMEvent(dm));
		return ResponseEntity.ok(CommonResponseDto.success("Success Send Message"));
	}

	//쪽지 삭제
	// @DeleteMapping("/{dmId}")
	// public ResponseEntity<CommonResponseDto<?>> deleteMessage(Authentication authentication, @PathVariable Long dmId) {
	// 	String usrName = authentication.getName();
	// 	User user = userService.findByUid(usrName).get();
	// }
}