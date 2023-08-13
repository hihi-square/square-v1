package com.hihi.square.domain.user.dto.response;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.Pattern;

import com.hihi.square.domain.user.entity.UserStatusType;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserInfoDto {

	private String uid;
	private String password;
	private String phone;

	private String nickname;
	private String name;
	private String email;
	private boolean marketingAgree;
	private String profile;

}
