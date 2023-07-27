package com.hihi.square.domain.user.dto.request;

import java.time.LocalDateTime;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

import com.hihi.square.domain.user.entity.Customer;
import com.hihi.square.domain.user.entity.UserRank;
import com.hihi.square.domain.user.entity.UserSocialLogin;
import com.hihi.square.domain.user.entity.UserStatus;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CustomerRegisterRequestDto {

	@NotEmpty
	private String uid;
	@NotEmpty
	private String password;
	@NotEmpty
	private String nickname;
	@NotEmpty
	private String name;
	@NotEmpty
	private String phone;
	@NotEmpty
	@Pattern(regexp = "[a-zA-z0-9]+@[a-zA-z]+[.]+[a-zA-z.]+")
	private String email;
	@NotNull
	private boolean marketingAgree;

	public Customer toEntity(){
		Customer customer = Customer.builder()
			.uid(uid)
			.password(password)
			.nickname(nickname)
			.name(name)
			.phone(phone)
			.email(email)
			.rank(UserRank.valueOf(UserRank.UR01.name()))
			.marketingAgree(marketingAgree)
			.createdAt(LocalDateTime.now())
			.modifiedAt(LocalDateTime.now())
			.lastLogin(LocalDateTime.now())
			.status(UserStatus.valueOf(UserStatus.ST01.name()))
			.social(UserSocialLogin.valueOf(UserSocialLogin.US01.name()))
			.build();
		return customer;
	}
}
