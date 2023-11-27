package com.hihi.square.domain.order.dto.response;

import com.hihi.square.domain.order.entity.OrderStatus;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class OrderStatusCountDto {
	private OrderStatus status;
	private Long count;
}