package com.hihi.square.domain.store.dto.response;

import lombok.Builder;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
@Builder
public class StoreNoticesResponseDto {
	@Builder.Default
	List<StoreNoticeResponseDto> notices = new ArrayList<>();
	private Integer statusCode;
	private String message;
}
