package com.hihi.square.domain.user.dto.response;

import java.util.ArrayList;
import java.util.List;

import com.hihi.square.global.common.CommonResponseDto;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class CustomerAddressListResponseDto {
	private String message;
	private Integer statusCode;
	private List<CustomerAddressDto> customerAddressDtoList = new ArrayList<>();

}
