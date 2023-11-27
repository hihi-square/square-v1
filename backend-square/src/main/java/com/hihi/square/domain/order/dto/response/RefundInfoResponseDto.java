package com.hihi.square.domain.order.dto.response;

import com.hihi.square.domain.order.entity.OrderStatus;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class RefundInfoResponseDto {
    private Integer ordId;
    private String payment;
    private Long finalPrice;
    private OrderStatus orderStatus;
}
