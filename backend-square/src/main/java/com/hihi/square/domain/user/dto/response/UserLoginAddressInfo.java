package com.hihi.square.domain.user.dto.response;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class UserLoginAddressInfo {
	private Long bCode;
	private String sidoName;
	private String siggName;
	private String emdName;
	private String fullName;
}