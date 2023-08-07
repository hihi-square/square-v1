package com.hihi.square.domain.order.dto.response;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class OrderDetailResponseDto {

    private Integer stoId;
    private String storeAddress;
    private String storePhone;
    private List<OrderMenuResponseDto> menuList;
    private Long totalPrice;

}
