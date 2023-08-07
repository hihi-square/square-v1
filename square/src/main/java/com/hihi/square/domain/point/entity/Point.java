package com.hihi.square.domain.point.entity;

import javax.persistence.*;

import com.hihi.square.domain.BaseTime;
import com.hihi.square.domain.order.entity.Order;
import com.hihi.square.domain.user.entity.Customer;
import com.hihi.square.domain.user.entity.User;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.time.LocalDateTime;

@Entity
@Getter
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "point")
public class Point {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer upo_id;
	@OneToOne
	@JoinColumn(name = "ord_id")
	private Order order;

	@OneToOne
	@JoinColumn(name = "usr_id")
	private Customer customer;

	private Long amount;

	@Column(name = "created_at")
	private LocalDateTime createdAt;

	private Integer type;  // 1 : 적립 , 0 : 차감
}
