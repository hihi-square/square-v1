package com.hihi.square.domain.coupon.dto.response;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CustomerCouponDto {
	private String storeName;
	private Integer storeId;
	private LocalDateTime startAt;
	private LocalDateTime expiredAt;
	private Integer couponId;
}
