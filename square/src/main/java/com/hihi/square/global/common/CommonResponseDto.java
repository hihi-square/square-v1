package com.hihi.square.global.common;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CommonResponseDto {
	private Integer statusCode;
	private String message;

}
