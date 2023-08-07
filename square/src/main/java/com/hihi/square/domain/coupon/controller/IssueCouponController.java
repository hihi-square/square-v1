package com.hihi.square.domain.coupon.controller;

import java.time.LocalDateTime;
import java.util.Currency;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hihi.square.domain.coupon.entity.Coupon;
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

}
