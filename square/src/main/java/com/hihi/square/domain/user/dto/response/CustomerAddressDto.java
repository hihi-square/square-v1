package com.hihi.square.domain.user.dto.response;

import java.time.LocalDateTime;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CustomerAddressDto {
	private Integer ucaId;

	private Integer emdId;
	private String emdName;
	private String siggName;
	private String sidoName;

	private String address;

	private LocalDateTime createdAt;
	private Double latitude;
	private Double longitude;
}
