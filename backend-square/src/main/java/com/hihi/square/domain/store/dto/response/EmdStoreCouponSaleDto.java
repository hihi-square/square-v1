package com.hihi.square.domain.store.dto.response;

import lombok.Builder;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Builder
@Data
public class EmdStoreCouponSaleDto {
	private Integer storeId;
	private String storeName;
	private String content;
	private String storeAddress;
	private String mainMenu;
	private String thumbnail;
	private Float latitude;
	private Float longitude;
	private Boolean isOpened;
	private Float rating;
	@Builder.Default
	private List<StoreCategorySelectedDto> categories = new ArrayList<>();
}
