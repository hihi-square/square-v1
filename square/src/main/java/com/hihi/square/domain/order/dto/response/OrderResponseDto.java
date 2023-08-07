package com.hihi.square.domain.order.dto.response;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class OrderResponseDto {

    private Integer ordId;
    private List<OrderDetailResponseDto> stores;
    private Long totalPrice;
    private Long usedPoint;
    private Long finalPrice;
}
