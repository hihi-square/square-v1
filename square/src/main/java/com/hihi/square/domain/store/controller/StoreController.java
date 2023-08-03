package com.hihi.square.domain.store.controller;

import com.hihi.square.domain.store.dto.request.ScsRegisterRequestDto;
import com.hihi.square.domain.store.dto.request.StoreRegisterRequestDto;
import com.hihi.square.domain.store.dto.request.StoreUpdateRequestDto;
import com.hihi.square.domain.store.dto.response.StoreInfoResponseDto;
import com.hihi.square.domain.store.dto.response.StoreListResponseDto;
import com.hihi.square.domain.store.dto.response.StoreUpdateResponseDto;
import com.hihi.square.domain.store.entity.BusinessInformation;
import com.hihi.square.domain.store.entity.Store;
import com.hihi.square.domain.store.entity.StoreCategoryBig;
import com.hihi.square.domain.store.service.BusinessInformationService;
import com.hihi.square.domain.store.service.CategoryService;
import com.hihi.square.domain.store.service.StoreCategoryService;
import com.hihi.square.domain.store.service.StoreService;
import com.hihi.square.domain.user.service.UserService;
import com.hihi.square.global.common.CommonResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/store")
@RequiredArgsConstructor
public class StoreController {

	private final StoreService storeService;
	private final BusinessInformationService businessInformationService;
	private final UserService userService;
	private final StoreCategoryService storeCategoryService;
	private final CategoryService categoryService;
	// 사업자 등록번호 중복확인
	@GetMapping("/business-license/{number}")
	public ResponseEntity<CommonResponseDto> validateDuplicateCompanyRegistration(@PathVariable Integer number) {
		if (businessInformationService.validateDuplicateCompanyRegistration(number)){
			return new ResponseEntity<>(CommonResponseDto.builder().message("INVALID").statusCode(200).build(),
				HttpStatus.CONFLICT);
		} else {
			return new ResponseEntity<>(CommonResponseDto.builder().message("VALID").statusCode(200).build(),
				HttpStatus.OK);
		}
	}

	// 가게 회원가입
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
		// 이메일 중복 체크
		if (userService.validateDuplicateEmail(store.getEmail())) {
			response.setMessage("ALREADY_EXISTS_EMAIL");
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

	// 가게정보 업데이트
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

	// 사용자가 가게 카테고리 선택시 가게 리스트 보여주는 api
	@GetMapping("/big-category/{id}")
	public ResponseEntity<?> getStoreByBigCategory(@PathVariable Integer id) {
		List<StoreListResponseDto> stores = storeService.findByCategoryId(id);
		return new ResponseEntity<>(stores, HttpStatus.OK);
	}

	// 판매자가 큰 카테고리에 자신의 가게를 등록하는 api 최대 3개
	@PostMapping("/big-category")
	public ResponseEntity<CommonResponseDto> registerStoreCategorySelectionByStore(Authentication authentication, @RequestBody ScsRegisterRequestDto request) {
		CommonResponseDto response = CommonResponseDto.builder()
				.statusCode(201)
				.message("CREATE_SUCCESS")
				.build();
		String uid = authentication.getName();
		// 판매자가 아니라면 등록불가
		if (!(userService.findByUid(uid).get() instanceof Store)) {
			response.setStatusCode(400);
			response.setMessage("NOT_AUTHENTICATE");
			return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
		}
		Store store = storeService.findById(request.getUsrId()).get();
		StoreCategoryBig storeCategoryBig = categoryService.findById(request.getScbId()).get();

		// 등록된 카테고리가 3개 이상이라면 등록 불가
		if(storeCategoryService.findByStore(store).size() > 3) {
			response.setStatusCode(400);
			response.setMessage("MAXIMUM_COUNT");
			return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
		}

		// 이미 등록된 카테고리라면 등록 불가
		if(storeCategoryService.validateDuplicateStoreCategory(store, storeCategoryBig)) {
			response.setStatusCode(400);
			response.setMessage("ALREADY_EXISTS");
			return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
		}

		storeCategoryService.save(store, storeCategoryBig);
		return new ResponseEntity<>(response, HttpStatus.CREATED);
	}

}
