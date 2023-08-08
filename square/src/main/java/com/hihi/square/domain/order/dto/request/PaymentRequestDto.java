package com.hihi.square.domain.order.dto.request;

import lombok.Data;

@Data
public class PaymentRequestDto {
    private Integer ordId;
    // 이걸로 order status 바꾸는거
    private Boolean paymentSuccess;
    private String paymentMethod;

}
