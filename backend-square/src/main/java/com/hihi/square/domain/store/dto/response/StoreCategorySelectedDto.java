package com.hihi.square.domain.store.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class StoreCategorySelectedDto {
	private Integer categoryId;
	private String categoryName;
}
