package com.hihi.square.domain.coupon.dto.request;

import java.time.LocalDateTime;

import com.hihi.square.domain.coupon.entity.DiscountType;

import lombok.Data;

@Data
public class StoreCouponRegistDto {

	private String name;
	private String content;
	private Integer issueStoreId;
	private LocalDateTime startAt;
	private LocalDateTime expiredAt;
	private DiscountType discountType;
	private Float rate;
	private Integer minOrderPrice;
	private Integer maxDiscountPrice;
	private Integer issueCondition;
}
