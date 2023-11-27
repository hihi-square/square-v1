package com.hihi.square.domain.store.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StoreSearchListDto {

	private Integer storeId;
	private String storeName;
	private String content;
	private String storeAddress;
	private String mainMenu;
	private String logo;
	private Float latitude;
	private Float longitude;
	private Float rating;
	private Boolean isOpened;
	private Boolean hasCoupon;

}
