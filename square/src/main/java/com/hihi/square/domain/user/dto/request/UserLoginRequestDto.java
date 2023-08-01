package com.hihi.square.domain.user.dto.request;

import com.hihi.square.domain.user.entity.User;
import com.hihi.square.domain.user.entity.UserAuthenticateType;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UserLoginRequestDto {
	private String uid;
	private String password;
	private UserAuthenticateType authenticate;
}

