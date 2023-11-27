package com.hihi.square.domain.order.dto.request;

import lombok.Data;

@Data
public class OrderMenuRequestDto {

    private Integer productId; // 일반, 연계, 할인 상품의 고유 id
    private String type; // 일반 ME01, 할인 ME02, 연계 ME03
    private Integer quantity;
    private Long price; // 개당 가격
}
