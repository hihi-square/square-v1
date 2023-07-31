package com.hihi.square.domain.Dibs.dto.response;

import com.hihi.square.domain.user.entity.EmdAddress;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
// @NoArgsConstructor
public class DibsResponseDto {
	private Integer dibId;
	private Integer usrId;
	private String uid;
	private EmdAddress emdAddress;
	private String address;
	private String storeName;
	private String storePhone;
}
