package com.hihi.square.domain.coupon.dto.response;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.hihi.square.domain.coupon.entity.CouponStatus;
import com.hihi.square.domain.coupon.entity.DiscountType;
import com.hihi.square.domain.store.entity.Store;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class StoreUserCouponListDto {
	private Integer id;
	private String name;
	private String content;
	private Integer toStoreId; // 사용하는 가게 아이디
	private String toStoreName; // 사용하는 가게 이름
	private Integer fromStoreId; // 발급해주는 가게 아이디
	private String fromStoreName; // 발급해주는 가게 이름
	private Boolean isSelf; // 자체 할인인지, 연계 할인인지
	private LocalDateTime createdAt;
	private LocalDateTime startAt;
	private LocalDateTime expiredAt;
	private DiscountType discountType; // 정액할인인지, 퍼센트 할인인지
	private Float rate; // 얼마? 5%, 500원
	private Integer minOrderPrice; // 최소 주문금액
	private Integer maxDiscountPrice; // 최대 할인금액
	private Integer issueCondition; // 이 가격 이상 사면 쿠폰 발급
	private Integer issueNumber; // 총 발급 수
	private Integer usedNumber; //  총 사용 수
	private CouponStatus status; // 현황
	private Boolean isOnlyIssue; // 발급만 해주는 경우 true
}


