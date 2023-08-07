package com.hihi.square.domain.order.dto.request;

import lombok.Data;

@Data
public class PaymentRequestDto {
    private Integer ordId;
    private Boolean paymentSuccess;
}
