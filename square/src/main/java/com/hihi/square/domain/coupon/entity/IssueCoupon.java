package com.hihi.square.domain.coupon.entity;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.hihi.square.domain.user.entity.Customer;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "issue_coupon")
public class IssueCoupon {
	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="uic_id")
	private Integer id;

	@JoinColumn(name= "usr_id")
	@ManyToOne
	private Customer customer;

	@JoinColumn(name="coupon_id")
	@ManyToOne
	private Coupon coupon;

	@Column(name="created_at")
	private LocalDateTime createdAt;

	@Column(name="expired_at")
	private LocalDateTime expiredAt;

	@Column(name="is_used")
	private Boolean isUsed;

	public void updateIsUsed(Boolean isUsed) {
		this.isUsed = isUsed;
	}

}
