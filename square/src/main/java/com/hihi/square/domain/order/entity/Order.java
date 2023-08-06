package com.hihi.square.domain.order.entity;

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
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

@Entity
@Getter
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "orders")
public class Order {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ord_id")
    private Integer ordId;

	@ManyToOne
	@JoinColumn(name = "usr_id")
	private Customer customer;

	@Column(name = "total_price")
	private Long totalPrice;

	@Column(name = "created_at")
	private LocalDateTime createdAt;

	@Column(name = "payment_method")
	private String paymentMethod;

	@Column(name = "used_point")
	private Long usedPoint;

	@Column(name = "final_price")
	private Long finalPrice;

	private String request;
}
