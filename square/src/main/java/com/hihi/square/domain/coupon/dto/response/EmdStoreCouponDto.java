package com.hihi.square.domain.coupon.dto.response;

import java.util.ArrayList;
import java.util.List;

import com.hihi.square.domain.store.dto.response.StoreCategorySelectedDto;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class EmdStoreCouponDto {
	private Integer storeId;
	private String storeName;
	private String content;
	private String storeAddress;
	private String mainMenu;
	private String thumbnail;
	private Float latitude;
	private Float longitude;
	// private Float rating; -> 추후 추가
	private List<StoreCategorySelectedDto> categories = new ArrayList<>();
}
