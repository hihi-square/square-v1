package com.hihi.square.domain.user.dto.response;

import java.time.LocalDateTime;
import com.hihi.square.domain.user.entity.EmdAddress;

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
	private Float latitude;
	private Float longitude;
}
