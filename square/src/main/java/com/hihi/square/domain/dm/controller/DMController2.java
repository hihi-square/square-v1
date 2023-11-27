// package com.hihi.square.domain.dm.controller;
//
// import java.util.Optional;
//
// import org.springframework.http.HttpStatus;
// import org.springframework.http.ResponseEntity;
// import org.springframework.security.core.Authentication;
// import org.springframework.web.bind.annotation.PostMapping;
// import org.springframework.web.bind.annotation.RequestBody;
// import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.RestController;
//
// import com.hihi.square.domain.dm.dto.request.DMWriteRequestDto;
// import com.hihi.square.domain.dm.service.DMService;
// import com.hihi.square.domain.user.entity.User;
// import com.hihi.square.domain.user.service.UserService;
// import com.hihi.square.global.common.CommonResponseDto;
//
// import lombok.RequiredArgsConstructor;
//
// @RestController
// @RequestMapping("/dm")
// @RequiredArgsConstructor
// public class DMController {
//
// 	private final UserService userService;
// 	private final DMService dmService;
//
// 	// 쪽지 작성
// 	@PostMapping
// 	public ResponseEntity writeDM(Authentication authentication, @RequestBody DMWriteRequestDto request) {
// 		User user = userService.findByUid(authentication.getName()).get();
// 		Optional<User> optionalReceiver = userService.findByNickname(request.getNickname());
// 		if (optionalReceiver.isEmpty()) {
// 			return new ResponseEntity(
// 				CommonResponseDto.builder().statusCode(400).message("INVALID_RECEIVER_NICKNAME").build(),
// 				HttpStatus.BAD_REQUEST);
// 		}
// 		User receiver = optionalReceiver.get();
// 		dmService.writeDM(user, receiver, request.getContent());
// 		return new ResponseEntity(CommonResponseDto.builder().statusCode(201).message("SUCCESS").build(),
// 			HttpStatus.CREATED);
// 	}
// }
