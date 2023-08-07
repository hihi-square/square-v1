package com.hihi.square.domain.order.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class OrderResponseDto {
    private Integer ordId;
    private Integer status;
    private String message;
}
