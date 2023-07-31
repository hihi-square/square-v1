package com.hihi.square.domain.Dibs.dto.response;

import java.util.ArrayList;
import java.util.List;

import com.hihi.square.domain.Dibs.entity.Dibs;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserDibsResponseDto {
	private List<DibsResponseDto> dibsList = new ArrayList<>();
	private Integer statusCode;
	private String message;
}
