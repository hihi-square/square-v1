package com.hihi.square.global.sse.entity;

import com.hihi.square.domain.order.entity.Order;
import com.hihi.square.domain.store.entity.Notice;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SendData {
	private Order order;
	private Notice notice;
}
