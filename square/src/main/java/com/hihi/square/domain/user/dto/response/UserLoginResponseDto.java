package com.hihi.square.domain.user.dto.response;

import net.bytebuddy.implementation.bind.annotation.BindingPriority;

import com.hihi.square.global.common.CommonResponseDto;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class UserLoginResponseDto {
	private Integer statusCode;
	private String message;
	private String accessToken;
	private String refreshToken;
}
