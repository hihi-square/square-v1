package com.hihi.square.domain.coupon.dto.response;

import java.time.LocalDateTime;

import com.hihi.square.domain.coupon.entity.Coupon;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CustomerCouponListDto {
	private Integer id;
	private CustomerCouponDto coupon;
	private LocalDateTime issuedAt; // 발급 일자
	private Boolean isUsed;
	private Boolean isExpired;
}
