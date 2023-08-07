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

import com.hihi.square.domain.coupon.entity.DiscountType;
import com.hihi.square.domain.store.entity.Store;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class StoreCouponDto {
	private Integer id;
	private String name;
	private String content;
	private LocalDateTime startAt;
	private LocalDateTime expiredAt;
	private DiscountType discountType; // 정액할인인지, 퍼센트 할인인지
	private Float rate; // 얼마? 5%, 500원
	private Integer minOrderPrice; // 최소 주문금액
	private Integer maxDiscountPrice; // 최대 할인금액
	private Boolean alreadyIssued;
}
