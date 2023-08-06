package com.hihi.square.domain.order.dto.request;

import lombok.Data;

import java.util.List;

@Data
public class OrderRequestDto {

    private Integer cusId; //customer

    // 어떻게 보면 가게당 주문 내역
    private List<OrderDetailRequestDto> stores;

    private Long totalPrice; // 포인트 적용되기 전가격
    // 그럼 프론트에서 결제금액은 포인트 빼고 남은돈으로 보여주기
    // 결제 api 넘겨줄때도 마찬가지 포인트 빼고 남은돈
    private String paymentMethod;
    private Long usedPoint; // 포인트 사용
    private String request;  // 전체 가게 요청사항
}
