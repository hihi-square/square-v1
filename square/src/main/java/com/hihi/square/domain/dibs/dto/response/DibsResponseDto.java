package com.hihi.square.domain.dibs.dto.response;

import com.hihi.square.domain.user.entity.EmdAddress;

import lombok.Builder;
import lombok.Data;

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
