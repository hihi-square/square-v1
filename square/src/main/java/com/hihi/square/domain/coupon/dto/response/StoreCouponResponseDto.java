package com.hihi.square.domain.coupon.dto.response;

import java.util.ArrayList;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class StoreCouponResponseDto {
	private String message;
	private Integer statusCode;
	private List<StoreCouponDto> coupons = new ArrayList<>();
}
