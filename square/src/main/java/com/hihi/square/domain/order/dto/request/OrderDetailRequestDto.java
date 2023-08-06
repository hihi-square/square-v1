package com.hihi.square.domain.order.dto.request;

import lombok.Data;

import java.util.List;

@Data
public class OrderDetailRequestDto {

    private Integer stoId; // store
    private Long totalPrice; // 가게별 가격 (without point)
    private List<OrderMenuRequestDto> menuList;
    private String requestDetail; // 가게별 요청사항

}
