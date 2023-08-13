package com.hihi.square.domain.user.dto.response;

import javax.persistence.Column;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;

import com.hihi.square.domain.user.entity.UserRankType;
import com.hihi.square.domain.user.entity.UserSocialLoginType;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CustomerInfoResponseDto {
	private Integer statusCode;
	private UserInfoDto info;
	private String rank;
	private UserSocialLoginType social;
	private Long point;
}
