package com.hihi.square.domain.user.dto.response;

import lombok.Builder;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Builder
@Data
public class CustomerAddressListResponseDto {
	private String message;
	private Integer statusCode;
	@Builder.Default
	private List<CustomerAddressDto> customerAddressDtoList = new ArrayList<>();

}
