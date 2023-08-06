package com.hihi.square.domain.user.controller;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.hihi.square.domain.user.dto.request.CustomerAddressCreateRequestDto;
import com.hihi.square.domain.user.dto.response.CustomerAddressDto;
import com.hihi.square.domain.user.dto.response.CustomerAddressListResponseDto;
import com.hihi.square.domain.user.entity.Customer;
import com.hihi.square.domain.user.entity.CustomerAddress;
import com.hihi.square.domain.user.entity.EmdAddress;
import com.hihi.square.domain.user.entity.SiggAddress;
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

	// 사용자 위치 삭제
	@DeleteMapping("/{id}")
	public ResponseEntity<?> deleteCustomerAddress(Authentication authentication, @PathVariable("id") Integer customerAddressId){
		String uid = authentication.getName();
		User user = userService.findByUid(uid).get();
		// 구매자만 사용자 주소 삭제 가능
		if (!(user instanceof Customer)) {
			return new ResponseEntity<>(
				CommonResponseDto.builder().message("ONLY_CUSTOMER_DELETE_ADDRESS").statusCode(400).build(),
				HttpStatus.BAD_REQUEST);
		}
		Optional<CustomerAddress> optionalCustomerAddress = customerAddressService.findById(customerAddressId);
		if (!optionalCustomerAddress.isPresent()) {
			return new ResponseEntity(CommonResponseDto.builder().statusCode(400).message("INVALID_CUSTOMER_ADDRESS_ID").build(), HttpStatus.BAD_GATEWAY);
		}
		CustomerAddress customerAddress = optionalCustomerAddress.get();
		if (!customerAddress.getCustomer().getUid().equals(uid)){
			return new ResponseEntity(CommonResponseDto.builder().statusCode(400).message("DELETE_ONLY_MY_ADDRESS").build(), HttpStatus.BAD_REQUEST);
		}
		customerAddressService.deleteAddress(customerAddress);
		return new ResponseEntity(CommonResponseDto.builder().message("SUCCESS").statusCode(200).build(), HttpStatus.OK);
	}

	@GetMapping
	public ResponseEntity<?> getUsersCustomerAddressList(Authentication authentication){
		String uid = authentication.getName();
		User user = userService.findByUid(uid).get();
		// 구매자만 사용자 주소 삭제 가능
		if (!(user instanceof Customer)) {
			return new ResponseEntity<>(
				CommonResponseDto.builder().message("ONLY_CUSTOMER_DELETE_ADDRESS").statusCode(400).build(),
				HttpStatus.BAD_REQUEST);
		}
		List<CustomerAddress> customerAddressList = customerAddressService.findAllByCustomer((Customer) user);
		List<CustomerAddressDto> result = new ArrayList<>();

		for(CustomerAddress ca : customerAddressList){
			EmdAddress emdAddress = ca.getEmdAddress();
			result.add(
				CustomerAddressDto.builder()
					.ucaId(ca.getUcaId())
					.emdId(emdAddress.getAemId())
					.emdName(emdAddress.getName())
					.siggName(emdAddress.getSiggName())
					.sidoName(emdAddress.getSidoName())
					.address(ca.getAddress())
					.createdAt(ca.getCreatedAt())
					.longitude(ca.getLongitude())
					.latitude(ca.getLatitude())
					.build()
			);
		}
		return new ResponseEntity<>(CustomerAddressListResponseDto.builder().statusCode(200).message("SUCCESS").customerAddressDtoList(result).build(), HttpStatus.OK);
	}
}
