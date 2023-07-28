package com.hihi.square.global.common;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
public class CommonResponseDto {
	private Integer statusCode;
	private String message;

}
