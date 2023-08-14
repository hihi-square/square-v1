package com.hihi.square.domain.coupon.dto.request;

import com.hihi.square.domain.coupon.entity.CouponStatus;

import lombok.Data;

@Data
public class CouponAcceptDto {
	private Integer couponId;
	private CouponStatus status;
}
