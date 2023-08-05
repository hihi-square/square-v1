package com.hihi.square.domain.user.controller;

import javax.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.hihi.square.domain.user.dto.request.CustomerAddressCreateRequestDto;
import com.hihi.square.domain.user.entity.Customer;
import com.hihi.square.domain.user.entity.User;
import com.hihi.square.domain.user.service.CustomerAddressService;
import com.hihi.square.domain.user.service.UserService;
import com.hihi.square.global.common.CommonResponseDto;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/user/address")
@RequiredArgsConstructor
public class CustomerAddressController {

	private final UserService userService;
	private final CustomerAddressService customerAddressService;

	//사용자 주소 등록
	@PostMapping
	public ResponseEntity<CommonResponseDto> createdCustomerAddress(Authentication authentication, @RequestBody @Valid CustomerAddressCreateRequestDto request){
		String uid = authentication.getName();
		User user = userService.findByUid(uid).get();
		// 구매자만 사용자 주소 등록 가능
		if (!(user instanceof Customer)){
			return new ResponseEntity<>(CommonResponseDto.builder().message("ONLY_CUSTOMER_REGISTER_ADDRESS").statusCode(400).build(), HttpStatus.BAD_REQUEST);
		}
		Customer customer = (Customer) user;
		// 만약에 이미 3개를 등록했으면 더이상 추가 등록 불가
		// if (customer.getCustomerAddressList().size() >= 3) {
		if (customerAddressService.findAllByCustomer(customer).size() >= 3) {
			return new ResponseEntity<>(CommonResponseDto.builder().message("FULL_ADDRESS").statusCode(400).build(), HttpStatus.BAD_REQUEST);
		}
		customerAddressService.addCustomerAddress(customer, request);
		return new ResponseEntity(CommonResponseDto.builder().statusCode(201).message("SUCCESS_ADD_ADDRESS").build(), HttpStatus.CREATED);
	}
}
