package com.hihi.square.domain.store.dto.response;

import java.util.ArrayList;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EmdStoreCouponSaleResponseDto {

	private Integer statusCode;
	List<EmdStoreCouponSaleDto> stores = new ArrayList<>();
}
