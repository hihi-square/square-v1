package com.hihi.square.domain.store.dto.response;

import com.hihi.square.domain.user.dto.response.UserInfoDto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class StoreInfoResDto {

	private UserInfoDto userInfo;
	private StoreInfoDto storeInfo;
	private Integer statusCode;
}
