package com.hihi.square.domain.user.dto.request;

import lombok.Data;

@Data
public class CustomerAddressCreateRequestDto {
	private Float longitude; // 경도
	private Float latitude; // 위도
	private String sidoName; // 시도
	private String siggName; // 시군구
	private String emdName; // 읍면동
	private String address; // 상세 주소
	// private Integer usrId; // 유저 아이디
}
