package com.hihi.square.domain.dibs.dto.response;

import lombok.Builder;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
@Builder
public class UserDibsResponseDto {
	@Builder.Default
	private List<DibsResponseDto> dibsList = new ArrayList<>();
	private Integer statusCode;
	private String message;
}
