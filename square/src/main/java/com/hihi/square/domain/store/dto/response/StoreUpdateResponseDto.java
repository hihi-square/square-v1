package com.hihi.square.domain.store.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class StoreUpdateResponseDto {
	private Integer statusCode;
	private String message;

	private StoreInfoResponseDto store;


}
