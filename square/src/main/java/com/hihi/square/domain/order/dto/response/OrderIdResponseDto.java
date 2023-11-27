package com.hihi.square.domain.order.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class OrderIdResponseDto {
    // 주문 체결 후 프론트에게 주문 번호 보내기 위한 DTO
    private Integer ordId;
    private Integer status;
    private String message;
}
