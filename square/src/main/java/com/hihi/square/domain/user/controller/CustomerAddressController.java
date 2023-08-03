package com.hihi.square.domain.user.controller;

import javax.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.hihi.square.domain.user.dto.request.CustomerAddressCreateRequestDto;
import com.hihi.square.domain.user.service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("")
@RequiredArgsConstructor
public class CustomerAddressController {

	private final UserService userService;

	//사용자 주소 등록
	public void createdCustomerAddress(Authentication authentication, @RequestBody @Valid CustomerAddressCreateRequestDto request){
		String uid = authentication.getName();

	}
}
