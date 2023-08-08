package com.hihi.square.domain.order.dto.response;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class OrderResponseDto {

    private Integer ordId;
    private Integer stoId;
    private String storeName;
    private String storeAddress;
    private String storePhone;
    private List<OrderMenuResponseDto> menuList;
    private Long totalPrice;
    private Long usedPoint;
    private Long finalPrice;

    // 결제 내역 결제 테이블에서 가져오기

}
