package com.hihi.square.domain.Dibs.controller;


import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hihi.square.domain.Dibs.entity.Dibs;
import com.hihi.square.domain.Dibs.service.DibsService;
import com.hihi.square.domain.store.entity.Store;
import com.hihi.square.domain.user.entity.Customer;
import com.hihi.square.domain.user.entity.User;
import com.hihi.square.domain.user.service.UserService;
import com.hihi.square.global.common.CommonResponseDto;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/dibs")
@RequiredArgsConstructor
public class DibsController {

	private final DibsService dibsService;
	private final UserService userService;


	//찜하기
	@PostMapping("/{storeId}")
	public ResponseEntity<CommonResponseDto> dibStore(Authentication authentication, @PathVariable(name = "storeId") String storeId){
		String uid =authentication.getName();
		Optional<User> optionalUser =userService.findByUid(uid);
		Optional<User> optionalStore = userService.findByUid(storeId);
		if (!optionalUser.isPresent() || !(optionalUser.get() instanceof Customer)){
			return new ResponseEntity<>(CommonResponseDto.builder().statusCode(400).message("INVALID_UID").build(),
				HttpStatus.BAD_REQUEST);
		}
		if (!optionalStore.isPresent() || !(optionalStore.get() instanceof Store)){
			return new ResponseEntity<>(CommonResponseDto.builder().statusCode(400).message("INVALID_STORE").build(),
				HttpStatus.BAD_REQUEST);
		}
		Customer customer = (Customer)optionalUser.get();
		Store store = (Store)optionalStore.get();
		if(dibsService.getDib(customer, store).isPresent()){
			return new ResponseEntity<>(CommonResponseDto.builder().statusCode(400).message("ALREADY_DIB").build(),
				HttpStatus.BAD_REQUEST);
		}
		dibsService.dibStore(customer, store);
		return new ResponseEntity<>(CommonResponseDto.builder().statusCode(201).message("SUCCESS").build(),
			HttpStatus.CREATED);

	}
	
	//찜취소
	@DeleteMapping("/{storeId}")
	public ResponseEntity<CommonResponseDto> dibCancel(Authentication authentication, @PathVariable(name = "storeId") String storeId){
		String uid =authentication.getName();
		Optional<User> optionalUser =userService.findByUid(uid);
		Optional<User> optionalStore = userService.findByUid(storeId);
		if (!optionalUser.isPresent() || !(optionalUser.get() instanceof Customer)){
			return new ResponseEntity<>(CommonResponseDto.builder().statusCode(400).message("INVALID_UID").build(),
				HttpStatus.BAD_REQUEST);
		}
		if (!optionalStore.isPresent() || !(optionalStore.get() instanceof Store)){
			return new ResponseEntity<>(CommonResponseDto.builder().statusCode(400).message("INVALID_STORE").build(),
				HttpStatus.BAD_REQUEST);
		}
		Customer customer = (Customer)optionalUser.get();
		Store store = (Store)optionalStore.get();
		Optional<Dibs> optionalDibs = dibsService.getDib(customer, store);
		if(!optionalDibs.isPresent()){
			return new ResponseEntity<>(CommonResponseDto.builder().statusCode(400).message("NOT_EXISTS_DIB").build(),
				HttpStatus.BAD_REQUEST);
		}
		dibsService.dibCancel(optionalDibs.get());
		return new ResponseEntity<>(CommonResponseDto.builder().statusCode(200).message("SUCCESS_CANCEL_DIB").build(),
			HttpStatus.OK);

	}
}
