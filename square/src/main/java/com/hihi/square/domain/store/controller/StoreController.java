package com.hihi.square.domain.store.controller;

import javax.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hihi.square.domain.store.dto.request.StoreUpdateRequestDto;
import com.hihi.square.domain.store.dto.response.StoreInfoResponseDto;
import com.hihi.square.domain.store.dto.response.StoreUpdateResponseDto;
import com.hihi.square.domain.store.entity.BusinessInformation;
import com.hihi.square.domain.store.entity.Store;
import com.hihi.square.domain.store.service.BusinessInformationService;
import com.hihi.square.domain.store.service.StoreService;
import com.hihi.square.domain.store.dto.request.StoreRegisterRequestDto;
import com.hihi.square.domain.user.service.UserService;
import com.hihi.square.global.common.CommonResponseDto;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/store")
@RequiredArgsConstructor
public class StoreController {

	private final StoreService storeService;
	private final BusinessInformationService businessInformationService;
	private final UserService userService;
	@GetMapping("/business-license/{number}")
	public ResponseEntity<CommonResponseDto> validateDuplicateCompanyRegistration(@PathVariable Integer number) {
		if (businessInformationService.validateDuplicateCompanyRegistration(number)){
			return new ResponseEntity<>(CommonResponseDto.builder().message("INVALID").statusCode(409).build(),
				HttpStatus.CONFLICT);
		} else {
			return new ResponseEntity<>(CommonResponseDto.builder().message("VALID").statusCode(200).build(),
				HttpStatus.OK);
		}
	}

	@PostMapping
	public ResponseEntity<CommonResponseDto> storeSignup(@RequestBody @Valid StoreRegisterRequestDto request) {
		Store store = request.toEntityStore();
		BusinessInformation businessInformation = request.toEntityBusinessInformation();
		CommonResponseDto response = CommonResponseDto.builder()
				.statusCode(409)
				.message("ALREADY_EXISTS_UID")
				.build();
		if (userService.validateDuplicateUid(store.getUid())) {
			return new ResponseEntity<>(response, HttpStatus.CONFLICT);
		}
		//닉네임 중복 체크
		if (userService.validateDuplicateNickname(store.getNickname())) {
			response.setMessage("ALREADY_EXISTS_NICKNAME");
			return new ResponseEntity<>(response, HttpStatus.CONFLICT);
		}
		//사업자번호 중복체크
		if (businessInformationService.validateDuplicateCompanyRegistration(businessInformation.getCompanyRegistrationNumber())){
			response.setMessage("ALREADY_EXISTS_COMPANY_REGISTER_NUMBER");
			return new ResponseEntity<>(response, HttpStatus.CONFLICT);
		}
		// 저장
		storeService.save(store, businessInformation);
		response.setStatusCode(201);
		response.setMessage("SIGNUP_SUCCESS");
		return new ResponseEntity<>(response, HttpStatus.CREATED);
	}

	@PatchMapping
	public ResponseEntity<?> updateStoreInfo(Authentication authentication, @RequestBody @Valid StoreUpdateRequestDto request) {
		String uid = authentication.getName();
		if (!(userService.findByUid(uid).get() instanceof Store)) {
			return new ResponseEntity<>(CommonResponseDto.builder().message("NOT_AUTHENTICATE").statusCode(400).build(), HttpStatus.BAD_REQUEST);
		}
		Store store  = storeService.findByUid(uid).get();
		storeService.updateStoreInfo(store, request);

		StoreInfoResponseDto res = StoreInfoResponseDto.builder()
			.storeName(store.getStoreName())
			.storePhone(store.getStorePhone())
			.emdAddress(store.getEmdAddress())
			.address(store.getAddress())
			.content(store.getContent())
			.bank(store.getBank())
			.account(store.getAccount())
			.build();



		return new ResponseEntity<>(StoreUpdateResponseDto.builder().store(res).statusCode(200).message("UPDATE_INFO").build(), HttpStatus.OK);
	}
}
