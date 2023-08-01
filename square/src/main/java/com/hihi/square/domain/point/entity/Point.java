package com.hihi.square.domain.point.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.hihi.square.domain.BaseTime;
import com.hihi.square.domain.order.entity.Order;
import com.hihi.square.domain.user.entity.User;

import lombok.Getter;

@Entity
@Getter
@Table(name = "point")
public class Point extends BaseTime {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer upo_id;
	@OneToOne
	@JoinColumn(name = "ord_id")
	private Order order;

	@OneToOne
	@JoinColumn(name = "usr_id")
	private User user;

	private Integer amount;
	private Integer type;
}
