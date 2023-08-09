package com.hihi.square.domain.coupon.entity;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedEntityGraph;
import javax.persistence.Table;

import com.hihi.square.domain.coupon.service.CouponService;
import com.hihi.square.domain.store.entity.Store;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "coupon")
public class Coupon {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="ssc_id")
	private Integer id;

	@ManyToOne
	@JoinColumn(name = "from_usr_id")
	private Store fromStore; // 여기서 사면

	@ManyToOne
	@JoinColumn(name = "to_usr_id")
	private Store toStore; //  여기서 쓰는 쿠폰 줌

	private String name;
	private String content;
	@Column(name="created_at")
	private LocalDateTime createdAt;
	@Column(name="start_at")
	private LocalDateTime startAt;
	@Column(name="expired_at")
	private LocalDateTime expiredAt;
	@Column(name="discount_type")
	@Enumerated(EnumType.STRING)
	private DiscountType discountType; // 정액할인인지, 퍼센트 할인인지
	private Float rate; // 얼마? 5%, 500원
	@Column(name="min_order_price")
	private Integer minOrderPrice; // 최소 주문금액
	@Column(name="max_discount_price")
	private Integer maxDiscountPrice; // 최대 할인금액

	@Column(name="issue_condition")
	private Integer issueCondition; // 이 가격 이상 사면 쿠폰 발급

	@Enumerated(EnumType.STRING)
	private CouponStatus status; // 발급대기, 발급, 발급 수락 x
}
