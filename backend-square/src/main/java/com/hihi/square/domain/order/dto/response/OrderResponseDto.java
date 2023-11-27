package com.hihi.square.domain.order.dto.response;

import com.hihi.square.domain.order.entity.OrderStatus;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
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
    private OrderStatus status;
    private LocalDateTime createdAt;
    private Boolean review;

    // 결제 내역 결제 테이블에서 가져오기

}
