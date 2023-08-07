package com.hihi.square.domain.coupon.dto.response;

import java.util.ArrayList;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CustomerCouponListResponseDto {

	private Integer statusCode;
	private List<CustomerCouponListDto> coupons = new ArrayList<>();
}
