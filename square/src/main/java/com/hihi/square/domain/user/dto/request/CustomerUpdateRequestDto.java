package com.hihi.square.domain.user.dto.request;

import org.hibernate.validator.constraints.Length;

import lombok.Data;

@Data
public class CustomerUpdateRequestDto {
	private String nickname;
	@Length(min=11, max=12)
	private String phone;

}
