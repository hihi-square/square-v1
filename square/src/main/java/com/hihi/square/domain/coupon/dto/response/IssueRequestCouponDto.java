package com.hihi.square.domain.coupon.dto.response;

import java.time.LocalDateTime;

import com.hihi.square.domain.coupon.entity.CouponStatus;
import com.hihi.square.domain.coupon.entity.DiscountType;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class IssueRequestCouponDto {
	private Integer id;
	private String name;
	private String content;
	private Integer toStoreId; // 사용하는 가게 아이디
	private String toStoreName; // 사용하는 가게 이름
	private LocalDateTime createdAt;
	private LocalDateTime startAt;
	private LocalDateTime expiredAt;
	private DiscountType discountType; // 정액할인인지, 퍼센트 할인인지
	private Float rate; // 얼마? 5%, 500원
	private Integer minOrderPrice; // 최소 주문금액
	private Integer maxDiscountPrice; // 최대 할인금액
	private Integer issueCondition; // 이 가격 이상 사면 쿠폰 발급
}
