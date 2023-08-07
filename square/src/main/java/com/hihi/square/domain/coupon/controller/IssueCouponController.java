package com.hihi.square.domain.coupon.controller;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Currency;
import java.util.List;
import java.util.Optional;

import org.apache.catalina.connector.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hihi.square.domain.coupon.dto.response.CustomerCouponDto;
import com.hihi.square.domain.coupon.dto.response.CustomerCouponListDto;
import com.hihi.square.domain.coupon.dto.response.CustomerCouponListResponseDto;
import com.hihi.square.domain.coupon.dto.response.StoreCouponDto;
import com.hihi.square.domain.coupon.entity.Coupon;
import com.hihi.square.domain.coupon.entity.IssueCoupon;
import com.hihi.square.domain.coupon.service.CouponService;
import com.hihi.square.domain.coupon.service.IssueCouponService;
import com.hihi.square.domain.user.entity.Customer;
import com.hihi.square.domain.user.entity.User;
import com.hihi.square.domain.user.service.UserService;
import com.hihi.square.global.common.CommonResponseDto;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/coupon/customer")
@RequiredArgsConstructor
public class IssueCouponController {

	private final UserService userService;
	private final IssueCouponService issueCouponService;
	private final CouponService couponService;

	// 사용자 쿠폰 발급
	@PostMapping("/{id}")
	public ResponseEntity issueCoupon(Authentication authentication, @PathVariable("id") Integer couponId) {
		String uid = authentication.getName();
		Optional<User> optionalUser = userService.findByUid(uid);
		if (!optionalUser.isPresent() || !(optionalUser.get() instanceof Customer)) {
			return new ResponseEntity(CommonResponseDto.builder().statusCode(400).message("INVALID_CUSTOMER").build(), HttpStatus.BAD_REQUEST);
		}
		Customer customer = (Customer) optionalUser.get();
		Optional<Coupon> optionalCoupon = couponService.findById(couponId);
		if (!optionalCoupon.isPresent()){
			return new ResponseEntity(CommonResponseDto.builder().statusCode(400).message("INVALID_COUPON_ID").build(), HttpStatus.BAD_REQUEST);
		}
		Coupon coupon = optionalCoupon.get();
		// 이미 발급 했는지 확인
		if (issueCouponService.isAlreadyIssued(customer, coupon)){
			return new ResponseEntity(CommonResponseDto.builder().statusCode(400).message("ALREADY_ISSUED_COUPON").build(), HttpStatus.BAD_REQUEST);
		}
		// 유효기간 확인
		if (coupon.getExpiredAt().isBefore(LocalDateTime.now())) {
			return new ResponseEntity(CommonResponseDto.builder().statusCode(400).message("ALREADY_EXPIRED_COUPON").build(), HttpStatus.BAD_REQUEST);
		}
		issueCouponService.issueCoupon(customer, coupon);
		return new ResponseEntity(CommonResponseDto.builder().statusCode(201).message("SUCCESS").build(), HttpStatus.CREATED);

	}

	// 구매자 쿠폰 리스트
	@GetMapping
	public ResponseEntity getCustomerCouponList(Authentication authentication){
		String uid = authentication.getName();
		Optional<User> optionalUser = userService.findByUid(uid);
		// 구매자만 쿠폰 리스트 볼 수 있음
		if (!optionalUser.isPresent() || !(optionalUser.get() instanceof Customer)) {
			return new ResponseEntity(CommonResponseDto.builder().statusCode(400).message("ONLY_CUSTOMER").build(), HttpStatus.BAD_REQUEST);
		}
		Customer customer = (Customer) optionalUser.get();
		List<IssueCoupon> issueCouponList = issueCouponService.findByCustomer(customer);
		List<CustomerCouponListDto> result = new ArrayList<>();
		for(IssueCoupon issueCoupon : issueCouponList) {
			Coupon coupon = issueCoupon.getCoupon();
			result.add(
				CustomerCouponListDto.builder()
					.id(issueCoupon.getId())
					.coupon(
						CustomerCouponDto.builder()
							.couponId(coupon.getId())
							.storeName(coupon.getName())
							.storeId(coupon.getId())
							.startAt(coupon.getStartAt())
							.expiredAt(coupon.getExpiredAt())
							.build()
					)
					.issuedAt(issueCoupon.getCreatedAt())
					.isUsed(issueCoupon.getIsUsed())
					.isExpired(LocalDateTime.now().isAfter(issueCoupon.getExpiredAt()))
					.build()
			);
		}
		return new ResponseEntity(CustomerCouponListResponseDto.builder().coupons(result).statusCode(200).build(), HttpStatus.OK);
	}

}
