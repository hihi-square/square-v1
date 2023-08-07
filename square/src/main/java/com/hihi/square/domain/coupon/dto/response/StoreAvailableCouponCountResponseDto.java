package com.hihi.square.domain.coupon.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class StoreAvailableCouponCountResponseDto {
	private Integer statusCode;
	private Integer count;
}
