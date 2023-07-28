package com.hihi.square.domain.user.dto.request;

import java.time.LocalDateTime;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

import com.hihi.square.domain.user.entity.Customer;
import com.hihi.square.domain.user.entity.UserRankType;
import com.hihi.square.domain.user.entity.UserSocialLoginType;
import com.hihi.square.domain.user.entity.UserStatusType;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
// @NoArgsConstructor
@AllArgsConstructor
public class CustomerRegisterRequestDto extends UserRegisterDto{

	public Customer toEntity(){
		Customer customer = Customer.builder()
			.uid(uid)
			.password(password)
			.nickname(nickname)
			.name(name)
			.phone(phone)
			.email(email)
			.rank(UserRankType.valueOf(UserRankType.UR01.name()))
			.marketingAgree(marketingAgree)
			.createdAt(LocalDateTime.now())
			.modifiedAt(LocalDateTime.now())
			.lastLogin(LocalDateTime.now())
			.status(UserStatusType.valueOf(UserStatusType.ST01.name()))
			.social(UserSocialLoginType.valueOf(UserSocialLoginType.US01.name()))
			.build();
		return customer;
	}
}
