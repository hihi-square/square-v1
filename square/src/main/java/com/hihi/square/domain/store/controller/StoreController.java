package com.hihi.square.domain.store.controller;

import javax.validation.Valid;
import javax.websocket.server.PathParam;

import com.hihi.square.domain.image.entity.Image;
import com.hihi.square.domain.image.service.ImageService;
import com.hihi.square.domain.menu.dto.response.MenuCategoryDto;
import com.hihi.square.domain.menu.service.MenuCategoryService;
import com.hihi.square.domain.menu.service.MenuService;
import com.hihi.square.domain.sale.dto.response.StoreSaleDto;
import com.hihi.square.domain.sale.service.SaleService;
import com.hihi.square.domain.store.dto.request.ScsRegisterRequestDto;
import com.hihi.square.domain.store.dto.request.StoreRegisterRequestDto;
import com.hihi.square.domain.store.dto.response.StoreInfoDto;
import com.hihi.square.domain.store.dto.response.StoreInfoResponseDto;
import com.hihi.square.domain.store.dto.response.StoreListResponseDto;
import com.hihi.square.domain.store.dto.response.StoreMenuResponseDto;
import com.hihi.square.domain.store.dto.response.StoreSearchListDto;
import com.hihi.square.domain.store.dto.response.StoreSearchResponseDto;
import com.hihi.square.domain.store.entity.StoreCategoryBig;
import com.hihi.square.domain.store.service.CategoryService;
import com.hihi.square.domain.store.service.StoreCategoryService;
import com.hihi.square.domain.user.dto.response.UserInfoDto;
import com.hihi.square.domain.user.entity.Customer;
import com.hihi.square.domain.user.entity.EmdAddress;
import com.hihi.square.domain.user.entity.User;
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

import com.hihi.square.domain.store.dto.response.StoreInfoResDto;
import com.hihi.square.domain.store.dto.response.StoreUpdateResponseDto;
import com.hihi.square.domain.store.entity.BusinessInformation;
import com.hihi.square.domain.store.entity.Store;
import com.hihi.square.domain.store.service.BusinessInformationService;
import com.hihi.square.domain.store.service.StoreService;
import com.hihi.square.domain.user.service.EmdAddressService;
import com.hihi.square.domain.user.service.UserService;
import com.hihi.square.global.common.CommonResponseDto;
import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/store")
@RequiredArgsConstructor
public class StoreController {

	private final StoreService storeService;
	private final BusinessInformationService businessInformationService;
	private final UserService userService;
	private final StoreCategoryService storeCategoryService;
	private final CategoryService categoryService;
	private final MenuCategoryService menuCategoryService;
	private final MenuService menuService;
	private final EmdAddressService emdAddressService;
	private final ImageService imageService;
	private final SaleService saleService;

	// 가게 회원정보 보기
	@GetMapping
	public ResponseEntity viewMyInfo(Authentication authentication) {
		String uid = authentication.getName();
		if (!(userService.findByUid(uid).get() instanceof Store)) {
			return new ResponseEntity<>(CommonResponseDto.builder().message("NOT_STORE_USER").statusCode(400).build(), HttpStatus.BAD_REQUEST);
		}
		Store store  = storeService.findByUid(uid).get();
		UserInfoDto userInfo = userService.getMyInfo(uid);
		StoreInfoDto storeInfo = StoreInfoDto.builder()
			.emdAddress(store.getEmdAddress())
			.address(store.getAddress())
			.storeName(store.getStoreName())
			.storePhone(store.getStorePhone())
			.content(store.getContent())
			.bank(store.getBank())
			.account(store.getAccount())
			.logo(store.getLogo())
			.openTime(store.getOpenTime())
			.latitude(store.getLatitude())
			.longitude(store.getLongitude())
			.hashtags(store.getHashtags())
			.isOpened(store.getIsOpened())
			.build();
		StoreInfoResDto response = StoreInfoResDto.builder()
			.userInfo(userInfo)
			.storeInfo(storeInfo)
			.statusCode(200)
			.build();

		return new ResponseEntity(response, HttpStatus.OK);

	}

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
		Optional<EmdAddress> emdAddress = emdAddressService.findByAdmCode(request.getBCode());
		if(emdAddress.isEmpty()){
			return new ResponseEntity<>(CommonResponseDto.builder().statusCode(400).message("INVALID_ADM_CODE").build(), HttpStatus.BAD_REQUEST);
		}
		Store store = request.toEntityStore(emdAddress.get());
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
				.isOpened(store.getIsOpened())
				.latitude(store.getLatitude())
				.longitude(store.getLongitude())
				.build();

		return new ResponseEntity<>(StoreUpdateResponseDto.builder().store(res).statusCode(200).message("UPDATE_INFO").build(), HttpStatus.OK);
	}

	// 사용자가 가게 카테고리 선택시 가게 리스트 보여주는 api

	@GetMapping("/big-category/{id}")
	public ResponseEntity<?> getStoreByBigCategory(@PathVariable Integer id) {
		List<StoreListResponseDto> stores = storeService.findByCategoryId(id);
		return new ResponseEntity<>(stores, HttpStatus.OK);
	}
	// 사용자 선택 가게 카테고리 + 읍면동 주소 + depth
	@GetMapping("/big-category/{id}/{admCode}/{depth}")
	public ResponseEntity<?> getStoreByBigCategory(@PathVariable Integer id, @PathVariable Long admCode, @PathVariable Integer depth) {
		Optional<EmdAddress> emdAddress = emdAddressService.findByAdmCode(admCode);
		if (emdAddress.isEmpty()){
			return new ResponseEntity<>(CommonResponseDto.builder().statusCode(400).message("INVALID_ADM_CODE").build(), HttpStatus.BAD_REQUEST);
		}
		List<StoreListResponseDto> storeListResponseDtos = storeService.findByCategoryIdAndSelectedEmd(id, emdAddress.get().getAemId(), depth);
		return new ResponseEntity<>(storeListResponseDtos, HttpStatus.OK);
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
		Store store = storeService.findByUsrId(request.getUsrId()).get();
		StoreCategoryBig storeCategoryBig = categoryService.findById(request.getScbId()).get();

		// 등록된 카테고리가 3개 이상이라면 등록 불가
		if(storeCategoryService.findByStore(store).size() >= 3) {
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

	// 가게 정보 상단 조회
	@GetMapping("/header/{id}")
	public ResponseEntity<?> getStoreHeaderInfo(@PathVariable Integer id) {
		Store store = storeService.findByUsrId(id).get();

		// 이미지 파일 받아오기
		List<Image> images = imageService.getImageResponseList("STORE", store.getUsrId());

		StoreInfoResponseDto res = StoreInfoResponseDto.builder()
				.storeName(store.getStoreName())
				.storePhone(store.getStorePhone())
				.address(store.getEmdAddress().getFullName()+" "+store.getAddress())
				.content(store.getContent())
				.backgroundImgUrl(images)
				.isOpened(store.getIsOpened())
				.latitude(store.getLatitude())
				.longitude(store.getLongitude())
				.build();
		return new ResponseEntity<>(res, HttpStatus.OK);
	}

	// 가게 메뉴 전부 보기
	@GetMapping("/menu/{usrId}")
	public ResponseEntity<?> getAllMenuByCategory(@PathVariable Integer usrId) {
		User user = userService.findByUsrId(usrId).get();
		List<StoreSaleDto> sales = saleService.getStoreInProgressSales((Store) user);
		List<MenuCategoryDto> menus = menuCategoryService.getAllMenuByCategory(user);

		StoreMenuResponseDto response = StoreMenuResponseDto.builder()
				.sales(sales)
				.menus(menus)
				.build();
		return new ResponseEntity<>(response, HttpStatus.OK);
	}

	// 가게 영업 시작/종료 처리
	@PostMapping("/open/{num}")
	public ResponseEntity setStoreOpenClose(Authentication authentication, @PathVariable("num") Integer num){
		String uid = authentication.getName();
		Optional<User> optionalUser = userService.findByUid(uid);
		if (optionalUser.isEmpty()){
			return new ResponseEntity(CommonResponseDto.builder().message("INVALID_USER").statusCode(400).build(), HttpStatus.BAD_REQUEST);
		}
		if (optionalUser.get() instanceof Customer) {
			return new ResponseEntity(CommonResponseDto.builder().message("NOT_STORE_USER").statusCode(400).build(), HttpStatus.BAD_REQUEST);
		}
		Store store = (Store) optionalUser.get();
		storeService.setStoreOpenClose(store, num == 1 ? true : false);
		return new ResponseEntity(CommonResponseDto.builder().statusCode(200).message("SUCCESS_SET_STORE_OPEN").build(), HttpStatus.OK);
	}

	// 가게 이름 + 해시태그 검색
	@GetMapping("/search/{admCode}/{depth}")
	public ResponseEntity searchByQuery(@PathVariable("admCode") Long admCode, @PathVariable("depth")Integer depth, @PathParam("query") String query) {
		Optional<EmdAddress> optionalEmdAddress = emdAddressService.findByAdmCode(admCode);
		if (optionalEmdAddress.isEmpty()){
			return new ResponseEntity(CommonResponseDto.builder().message("INVALID_ADM_CODE").statusCode(400).build(), HttpStatus.BAD_REQUEST);
		}
		EmdAddress emdAddress = optionalEmdAddress.get();
		List<StoreSearchListDto> stores;
		if (query == null) {
			stores = storeService.findByEmdAddress(emdAddress, depth);
		} else {
			stores = storeService.findByEmdAddressAndQuery(emdAddress, depth, query);
		}
		return new ResponseEntity(StoreSearchResponseDto.builder().stores(stores).statusCode(200).build(), HttpStatus.OK);
	}


}
