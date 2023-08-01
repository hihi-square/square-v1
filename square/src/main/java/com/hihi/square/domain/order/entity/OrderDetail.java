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

import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "order_detail")
@Getter
@Setter
public class OrderDetail {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "odt_id")
	private Integer id;

	@ManyToOne
	@JoinColumn(name = "ord_id")
	private Order order;

	@ManyToOne
	@JoinColumn(referencedColumnName = "usr_id")
	private Customer customer;

	@ManyToOne
	@JoinColumn(referencedColumnName = "usr_id")
	private Store store;

	@Column(name = "total_price")
	private Integer totalPrice;

	private String requests;

	@Column(name = "created_at")
	private LocalDateTime createdAt;

	@Enumerated(EnumType.STRING)
	private OrderStatus status;

	@Column(name = "used_point")
	private Integer usedPoint;

}
