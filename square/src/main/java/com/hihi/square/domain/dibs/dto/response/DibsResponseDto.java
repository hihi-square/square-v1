package com.hihi.square.domain.dibs.dto.response;

import com.hihi.square.domain.user.entity.EmdAddress;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
// @NoArgsConstructor
public class DibsResponseDto {
	private Integer dibId;
	private Integer cusId;
	private Integer stoId;
	private String storeName;
	private String content;
	private String storeAddress;
	private String mainMenu;
	private String logo;
	private Boolean isOpened;
	private Float latitude;
	private Float longitude;
}
