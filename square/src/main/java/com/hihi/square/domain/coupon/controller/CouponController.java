package com.hihi.square.domain.coupon.controller;

import java.util.Currency;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import net.bytebuddy.dynamic.scaffold.TypeWriter;

import com.hihi.square.domain.coupon.dto.request.StoreCouponRegistDto;
import com.hihi.square.domain.coupon.service.CouponService;
import com.hihi.square.domain.store.entity.Store;
import com.hihi.square.domain.user.entity.Customer;
import com.hihi.square.domain.user.entity.User;
import com.hihi.square.domain.user.service.UserService;
import com.hihi.square.global.common.CommonResponseDto;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/coupon/store")
@RequiredArgsConstructor
public class CouponController {

	private final UserService userService;
	private final CouponService couponService;

	// 가게 쿠폰 등록
	@PostMapping
	public ResponseEntity registStoreCoupon(Authentication authentication, @RequestBody StoreCouponRegistDto request) {
		String uid = authentication.getName();
		User user = userService.findByUid(uid).get();
		// 가게 쿠폰 등록은 가게 회원만 가능
		if (!(user instanceof Store)) {
			return new ResponseEntity(CommonResponseDto.builder().statusCode(400).message("NOT_AUTHENTICATE").build(), HttpStatus.BAD_REQUEST);
		}
		couponService.createCoupon((Store) user, request);
		return new ResponseEntity(CommonResponseDto.builder().statusCode(201).message("SUCCESS").build(), HttpStatus.CREATED);
	}
}
