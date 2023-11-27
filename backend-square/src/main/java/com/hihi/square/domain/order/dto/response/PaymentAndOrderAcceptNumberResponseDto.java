package com.hihi.square.domain.order.dto.response;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class PaymentAndOrderAcceptNumberResponseDto {
	private Integer paymentComplete;
	private Integer orderAccept;
}
