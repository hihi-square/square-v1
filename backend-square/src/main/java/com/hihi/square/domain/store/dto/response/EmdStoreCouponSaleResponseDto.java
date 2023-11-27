package com.hihi.square.domain.store.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EmdStoreCouponSaleResponseDto {

	private Integer statusCode;
	@Builder.Default
	List<EmdStoreCouponSaleDto> stores = new ArrayList<>();
}
