package com.hihi.square.domain.order.entity;

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
import javax.persistence.Table;

import com.hihi.square.domain.store.entity.Store;

import com.hihi.square.domain.user.entity.Customer;
import lombok.*;
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

	@ManyToOne(targetEntity = Store.class)
	@JoinColumn(name = "sto_id", referencedColumnName = "usr_id")
	private Store store;

	@ManyToOne(targetEntity = Customer.class)
	@JoinColumn(name = "cus_id", referencedColumnName = "usr_id")
	private Customer customer;

	@Column(name = "request")
	private String request;

	@Column(name = "created_at")
	private LocalDateTime createdAt;

	@Column(name = "total_price")
	private Long totalPrice;

	@Column(name = "used_point")
	private Long usedPoint;

	@Column(name = "final_price")
	private Long finalPrice;

	@Enumerated(EnumType.STRING)
	private OrderStatus status;

	@Column(name = "payment_method")
	private String paymentMethod;
	public void updateOrderStatus(OrderStatus status) {
		this.status = status;
	}

	public void updatePaymentMethod(String paymentMethod) {
		this.paymentMethod = paymentMethod;
	}
}
