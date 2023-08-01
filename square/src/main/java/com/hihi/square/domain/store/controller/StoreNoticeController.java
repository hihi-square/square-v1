package com.hihi.square.domain.store.controller;


import java.util.ArrayList;
import java.util.List;

import javax.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hihi.square.domain.store.dto.request.StoreNoticeWriteRequestDto;
import com.hihi.square.domain.store.dto.response.StoreNoticesResponseDto;
import com.hihi.square.domain.store.entity.Store;
import com.hihi.square.domain.store.service.StoreNoticeService;
import com.hihi.square.domain.user.entity.User;
import com.hihi.square.domain.user.service.UserService;
import com.hihi.square.global.common.CommonResponseDto;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/store/daily")
@RequiredArgsConstructor
public class StoreNoticeController {

	private final UserService userService;
	private final StoreNoticeService storeNoticeService;

	@PostMapping
	public ResponseEntity postStoreNotice(Authentication authentication, @RequestBody @Valid StoreNoticeWriteRequestDto request) {
		String uid = authentication.getName();
		User user = userService.findByUid(uid).get();
		if (!(user instanceof Store) || user.getUsrId() != request.getUsrId()) {
			return new ResponseEntity(CommonResponseDto.builder().message("NOT_AUTHENTICATE").statusCode(400).build(),
				HttpStatus.BAD_GATEWAY);
		}
		storeNoticeService.write((Store) user, request);
		return new ResponseEntity(CommonResponseDto.builder().statusCode(201).message("SUCCESS_WRITE").build(), HttpStatus.CREATED);
	}

	@GetMapping("/{storeId}")
	public ResponseEntity getStoreNotices(@PathVariable("storeId") Integer storeId){
		User user = userService.findByUsrId(storeId).get();
		if (!(user instanceof Store) || user.getUsrId() != storeId) {
			return new ResponseEntity(CommonResponseDto.builder().message("NOT_AUTHENTICATE").statusCode(400).build(),
				HttpStatus.BAD_GATEWAY);
		}
		StoreNoticesResponseDto result =  StoreNoticesResponseDto.builder()
			.notices(storeNoticeService.getNoticeList((Store) user))
			.statusCode(200)
			.message("SUCCESS")
			.build();
		return new ResponseEntity(result, HttpStatus.OK);
	}

}
