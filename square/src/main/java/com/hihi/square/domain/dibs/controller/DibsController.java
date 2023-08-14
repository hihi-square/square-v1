package com.hihi.square.domain.dibs.controller;


import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hihi.square.domain.dibs.dto.response.DibsResponseDto;
import com.hihi.square.domain.dibs.dto.response.UserDibsResponseDto;
import com.hihi.square.domain.dibs.entity.Dibs;
import com.hihi.square.domain.dibs.service.DibsService;
import com.hihi.square.domain.report.entity.Report;
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
	public ResponseEntity<CommonResponseDto> dibStore(Authentication authentication, @PathVariable(name = "storeId") Integer storeId){
		String uid =authentication.getName();
		Optional<User> optionalUser =userService.findByUid(uid);
		Optional<User> optionalStore = userService.findByUsrId(storeId);
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
	public ResponseEntity<CommonResponseDto> dibCancel(Authentication authentication, @PathVariable(name = "storeId") Integer storeId){
		String uid =authentication.getName();
		Optional<User> optionalUser =userService.findByUid(uid);
		Optional<User> optionalStore = userService.findByUsrId(storeId);
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

	@GetMapping
	public ResponseEntity getUserDibsList(Authentication authentication){
		String uid = authentication.getName();
		Customer customer = (Customer)userService.findByUid(uid).get();
		List<DibsResponseDto> result = dibsService.getUserDibs(customer);
		return new ResponseEntity(UserDibsResponseDto.builder().statusCode(200).message("COMPLETE").dibsList(result).build(), HttpStatus.OK);
	}

	@GetMapping("/{id}")
	public ResponseEntity isLikedStore(Authentication authentication, @PathVariable("id") Integer storeId) {
		String uid = authentication.getName();
		Optional<User> user = userService.findByUid(uid);
		if (!user.isPresent() || !(user.get() instanceof Customer)){
			return new ResponseEntity(CommonResponseDto.builder().statusCode(400).message("INVALID_CUSTOMER").build(), HttpStatus.BAD_REQUEST);
		}
		Customer customer = (Customer) user.get();
		user = userService.findByUsrId(storeId);
		if (!user.isPresent() || !(user.get() instanceof Store)){
			return new ResponseEntity(CommonResponseDto.builder().statusCode(400).message("INVALID_STORE").build(), HttpStatus.BAD_REQUEST);
		}
		Optional<Dibs> dibs = dibsService.getDib(customer, (Store) user.get());
		return new ResponseEntity(CommonResponseDto.builder().statusCode(200).message(dibs.isPresent()?"EXISTS":"NOT_EXISTS").build(), HttpStatus.OK);
	}
}
