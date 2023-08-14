package com.hihi.square.domain.order.dto.request;

import lombok.Data;

import java.util.List;

@Data
public class OrderRequestDto {

    private Integer cusId; //customer
    private Integer stoId; // store
    private List<OrderMenuRequestDto> menuList;
    private Long totalPrice; // 가게별 가격 (without point)
    // totalPrice = 할인 상품 + 일반상품 * 할인율
    private Long usedPoint; // 포인트 사용
    private String request; // 가게별 요청사항
    private Integer uicId; // 사용할 발급 쿠폰 고유 아이디

}
