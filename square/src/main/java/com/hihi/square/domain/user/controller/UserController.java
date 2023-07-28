package com.hihi.square.domain.user.controller;

import javax.validation.Valid;

import com.hihi.square.domain.store.dto.request.StoreRegisterRequestDto;
import com.hihi.square.domain.store.entity.BusinessInformation;
import com.hihi.square.domain.store.entity.Store;
import com.hihi.square.domain.store.service.BusinessInformationService;
import com.hihi.square.domain.store.service.StoreService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hihi.square.domain.user.entity.Customer;
import com.hihi.square.domain.user.dto.request.CustomerRegisterRequestDto;
import com.hihi.square.domain.user.service.CustomerService;
import com.hihi.square.domain.user.service.UserService;
import com.hihi.square.global.common.CommonResponseDto;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
@Slf4j
public class UserController {

	private final UserService userService;
	private final CustomerService customerService;
	private final StoreService storeService;
	private final BusinessInformationService businessInformationService;

	//회원가입
	@PostMapping
	public ResponseEntity<CommonResponseDto> singup(@RequestBody @Valid CustomerRegisterRequestDto request) {
		Customer customer = request.toEntity();
		//아이디 중복 체크
		if (userService.validateDuplicateUid(customer.getUid())){
			CommonResponseDto response = CommonResponseDto.builder()
					.statusCode("409")
						.message("ALREADY_EXISTS_UID")
				.build();
			return new ResponseEntity<CommonResponseDto>(response, HttpStatus.CONFLICT);
		}
		//닉네임 중복 체크
		if (userService.validateDuplicateNickname(customer.getNickname())) {
			CommonResponseDto response = CommonResponseDto.builder()
				.statusCode("409")
				.message("ALREADY_EXISTS_NICKNAME")
				.build();
			return new ResponseEntity<CommonResponseDto>(response, HttpStatus.CONFLICT);
		}
		//저장
		customerService.save(customer);
		CommonResponseDto response = CommonResponseDto.builder()
			.statusCode("201")
			.message("SIGNUP_SUCCESS")
			.build();
		return new ResponseEntity<>(response, HttpStatus.CREATED);
	}

	@PostMapping("/store")
	public ResponseEntity<CommonResponseDto> storeSignup(@RequestBody @Valid StoreRegisterRequestDto request) {
		Store store = request.toEntityStore();
		BusinessInformation businessInformation = request.toEntityBusinessInformation();
		if (userService.validateDuplicateUid(store.getUid())) {
			CommonResponseDto response = CommonResponseDto.builder()
					.statusCode("409")
					.message("ALREADY_EXISTS_UID")
					.build();
			return new ResponseEntity<>(response, HttpStatus.CONFLICT);
		}
		//닉네임 중복 체크
		if (userService.validateDuplicateNickname(store.getNickname())) {
			CommonResponseDto response = CommonResponseDto.builder()
					.statusCode("409")
					.message("ALREADY_EXISTS_NICKNAME")
					.build();
			return new ResponseEntity<>(response, HttpStatus.CONFLICT);
		}
		//사업자번호 중복체크
		if (businessInformationService.validateDuplicateCompanyRegistration(businessInformation.getCompanyRegistrationNumber())){
			CommonResponseDto response = CommonResponseDto.builder()
					.statusCode("409")
					.message("ALREADY_EXISTS_COMPANY_REGISTER_NUMBER")
					.build();
			return new ResponseEntity<>(response, HttpStatus.CONFLICT);
		}
		// 저장
		storeService.save(store, businessInformation);
		CommonResponseDto response = CommonResponseDto.builder().message("SIGNUP_SUCCESS").statusCode("201").build();
		return new ResponseEntity<>(response, HttpStatus.CREATED);
	}

}
