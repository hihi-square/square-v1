package com.hihi.square.domain.store.dto.response;

import java.util.ArrayList;
import java.util.List;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class StoreSearchResponseDto {
	@Builder.Default
	private List<StoreSearchListDto> stores = new ArrayList<>();
	private Integer statusCode;
}
