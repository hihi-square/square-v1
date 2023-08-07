package com.hihi.square.domain.order.dto.response;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class OrderMenuResponseDto {

    // 나중을 위한 정보(조회)
    private Integer productId;
    private String type;

    private String menuName;
    private Integer quantity;
    private Long price;

}
