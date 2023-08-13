package com.hihi.square.domain.user.dto.request;

import org.hibernate.validator.constraints.Length;

import lombok.Data;

@Data
public class CustomerUpdateRequestDto {
	private String nickname;
	private String phone;
	private String email;
}
