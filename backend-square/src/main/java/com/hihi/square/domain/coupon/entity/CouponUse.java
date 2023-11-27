package com.hihi.square.domain.coupon.entity;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.hihi.square.domain.order.entity.Order;
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
@Table(name = "coupon_use")
public class CouponUse {
	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="usu_id")
	private Integer id;

	@ManyToOne
	@JoinColumn(name = "usr_id")
	private Customer customer;

	@ManyToOne
	@JoinColumn(name = "ord_id")
	private Order order;

	@Column(name= "used_at")
	private LocalDateTime usedAt;

	@JoinColumn(name= "scc_id")
	@OneToOne
	private IssueCoupon issueCoupon;
}
