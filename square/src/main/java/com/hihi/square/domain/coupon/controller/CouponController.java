package com.hihi.square.domain.coupon.controller;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hihi.square.domain.coupon.dto.request.StoreCouponRegistDto;
import com.hihi.square.domain.coupon.entity.DiscountType;
import com.hihi.square.domain.store.dto.response.EmdStoreCouponSaleDto;
import com.hihi.square.domain.store.dto.response.EmdStoreCouponSaleResponseDto;
import com.hihi.square.domain.coupon.dto.response.StoreAvailableCouponCountResponseDto;
import com.hihi.square.domain.coupon.dto.response.StoreCouponDto;
import com.hihi.square.domain.coupon.dto.response.StoreCouponResponseDto;
import com.hihi.square.domain.coupon.dto.response.StoreUserCouponListDto;
import com.hihi.square.domain.coupon.dto.response.StoreUserCouponResponseDto;
import com.hihi.square.domain.coupon.entity.Coupon;
import com.hihi.square.domain.coupon.service.CouponService;
import com.hihi.square.domain.coupon.service.IssueCouponService;
import com.hihi.square.domain.store.entity.Store;
import com.hihi.square.domain.store.service.StoreService;
import com.hihi.square.domain.user.entity.Customer;
import com.hihi.square.domain.user.entity.EmdAddress;
import com.hihi.square.domain.user.entity.User;
import com.hihi.square.domain.user.service.EmdAddressService;
import com.hihi.square.domain.user.service.UserService;
import com.hihi.square.global.common.CommonResponseDto;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/coupon/store")
@RequiredArgsConstructor
public class CouponController {

	private final UserService userService;
	private final CouponService couponService;
	private final IssueCouponService issueCouponService;
	private final EmdAddressService emdAddressService;
	private final StoreService storeService;

	// 가게 쿠폰 등록
	@PostMapping
	public ResponseEntity registStoreCoupon(Authentication authentication, @RequestBody StoreCouponRegistDto request) {
		String uid = authentication.getName();
		User user = userService.findByUid(uid).get();
		// 가게 쿠폰 등록은 가게 회원만 가능
		if (!(user instanceof Store)) {
			return new ResponseEntity(CommonResponseDto.builder().statusCode(400).message("NOT_AUTHENTICATE").build(), HttpStatus.BAD_REQUEST);
		}
		Optional<User> optionalStore = userService.findByUsrId(request.getIssueStoreId());
		if (optionalStore.isEmpty() || optionalStore.get() instanceof Customer) {
			return new ResponseEntity(CommonResponseDto.builder().statusCode(400).message("INVALID_ISSUE_STORE_ID").build(), HttpStatus.BAD_REQUEST);
		}
		couponService.createCoupon((Store) user, (Store) optionalStore.get(), request);
		return new ResponseEntity(CommonResponseDto.builder().statusCode(201).message("SUCCESS").build(), HttpStatus.CREATED);
	}

	// 해당 가게에 있는 사용 가능한 쿠폰 개수
	@GetMapping("/count/{id}")
	public ResponseEntity countAvailableCoupon(@PathVariable("id") Integer storeId){
		Optional<User> optionalUser = userService.findByUsrId(storeId);
		if (!optionalUser.isPresent() || !(optionalUser.get() instanceof Store)) {
			return new ResponseEntity<>(CommonResponseDto.builder().statusCode(400).message("INVALID_STORE_USER").build(), HttpStatus.BAD_REQUEST);
		}
		Store store = (Store) optionalUser.get();
		return new ResponseEntity(StoreAvailableCouponCountResponseDto.builder().statusCode(200).count(couponService.countAvailableCoupon(store)).build(), HttpStatus.OK);
	}


	// 해당 가게에서 현재 발급하고 있는 쿠폰들
	@GetMapping("/{id}")
	public ResponseEntity getStoreAvailableCoupon(Authentication authentication, @PathVariable("id") Integer storeId){
		String uid = authentication.getName();
		Optional<User> optionalCustomer = userService.findByUid(uid);
		if (!optionalCustomer.isPresent() || !(optionalCustomer.get() instanceof Customer)) {
			return new ResponseEntity(CommonResponseDto.builder().statusCode(400).message("INVALID_CUSTOMER_ID").build(), HttpStatus.BAD_REQUEST);
		}
		Customer customer = (Customer) optionalCustomer.get();
		Optional<User> optionalStore = userService.findByUsrId(storeId);
		if (!optionalStore.isPresent() || !(optionalStore.get() instanceof Store)) {
			return new ResponseEntity(CommonResponseDto.builder().statusCode(400).message("INVALID_STORE_ID").build(), HttpStatus.BAD_REQUEST);
		}
		Store store = (Store) optionalStore.get();
		List<Coupon> couponList = couponService.findAllAvailableCouponByFromStore(store);
		List<StoreCouponDto> result = new ArrayList<>();

		for(Coupon coupon : couponList){
			result.add(StoreCouponDto.builder()
				.id(coupon.getId())
				.name(coupon.getName())
				.toStoreId(coupon.getToStore().getUsrId())
				.toStoreName(coupon.getToStore().getStoreName())
				.isSelf(coupon.getToStore().getUsrId() == coupon.getFromStore().getUsrId())
				.issueCondition(coupon.getIssueCondition())
				.content(coupon.getContent())
				.startAt(coupon.getStartAt())
				.expiredAt(coupon.getExpiredAt())
				.discountType(coupon.getDiscountType())
				.rate(coupon.getRate())
				.minOrderPrice(coupon.getMinOrderPrice())
				.maxDiscountPrice(coupon.getMaxDiscountPrice())
				.alreadyIssued(issueCouponService.isAlreadyIssued(customer, coupon))
				.build());
		}
		return new ResponseEntity(StoreCouponResponseDto.builder().coupons(result).statusCode(200).message("SUCCESS").build(), HttpStatus.OK);

	}


	// 가게 회원의 모든 쿠폰정보 불러오기
	@GetMapping
	public ResponseEntity<?> getStoreCouponAll(Authentication authentication){
		String uid = authentication.getName();
		Optional<User> optionalUser = userService.findByUid(uid);
		if (!optionalUser.isPresent() || !(optionalUser.get() instanceof Store)) {
			return new ResponseEntity<>(CommonResponseDto.builder().statusCode(400).message("INVALID_STORE_USER").build(), HttpStatus.BAD_REQUEST);
		}
		Store store = (Store) optionalUser.get();
		List<Coupon> couponList = couponService.findAllByStore(store);
		List<StoreUserCouponListDto> result = new ArrayList<>();

		for(Coupon coupon : couponList) {
			result.add(StoreUserCouponListDto.builder()
					.id(coupon.getId())
					.name(coupon.getName())
					.content(coupon.getContent())
					.toStoreId(coupon.getToStore().getUsrId())
					.toStoreName(coupon.getToStore().getStoreName())
					.fromStoreId(coupon.getFromStore().getUsrId())
					.fromStoreName(coupon.getFromStore().getStoreName())
					.isSelf(coupon.getToStore().getUsrId() == coupon.getFromStore().getUsrId())
					.isOnlyIssue(!coupon.getToStore().getUid().equals(uid))
					.createdAt(coupon.getCreatedAt())
					.startAt(coupon.getStartAt())
					.expiredAt(coupon.getExpiredAt())
					.discountType(coupon.getDiscountType())
					.rate(coupon.getRate())
					.minOrderPrice(coupon.getMinOrderPrice())
					.maxDiscountPrice(coupon.getMaxDiscountPrice())
					.issueCondition(coupon.getIssueCondition())
					.issueNumber(issueCouponService.getIssueNumber(coupon))
					.usedNumber(issueCouponService.getUsedNumber(coupon))
					.status(coupon.getStatus())
				.build());
		}
		return new ResponseEntity<>(
			StoreUserCouponResponseDto.builder().coupons(result).statusCode(200).message("SUCCESS").build(), HttpStatus.OK);

	}

	// 읍면동 지역 + depth 에 대해서 현재 발급 가능한 쿠폰이 있는 가게 리스트
	@GetMapping("/emd/{emdId}/{depth}")
	public ResponseEntity getStoreListAvailableCoupon(@PathVariable("emdId") Integer emdId, @PathVariable("depth")Integer depth) {
		Optional<EmdAddress> emdAddressOptional = emdAddressService.findById(emdId);
		if (emdAddressOptional.isEmpty()){
			return new ResponseEntity(CommonResponseDto.builder().statusCode(400).message("INVALID_EMD").build(), HttpStatus.BAD_REQUEST);
		}
		List<EmdAddress> emdAddressList = emdAddressService.getEmdAddressWithDepth(emdId, depth);
		List<EmdStoreCouponSaleDto> result = couponService.findByEmdAddressWithAvailableCoupon(emdAddressList);
		return new ResponseEntity(EmdStoreCouponSaleResponseDto.builder().statusCode(200).stores(result).build(), HttpStatus.OK);
	}
}
