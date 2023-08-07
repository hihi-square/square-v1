package com.hihi.square.domain.coupon.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StoreUserCouponResponseDto {
	private String message;
	private Integer statusCode;
	@Builder.Default
	private List<StoreUserCouponListDto> coupons = new ArrayList<>();
}
