package com.hihi.square.domain.order.event;

import org.springframework.context.ApplicationEvent;

import com.hihi.square.domain.order.entity.Order;

import lombok.Getter;

@Getter
public class OrderEvent extends ApplicationEvent {
	private Order order;
	private String content;

	public OrderEvent(Order order, String content) {
		super(order);
		this.order = order;
		this.content = content;
	}
}
