package com.hihi.square.domain.user.dto.request;

import com.hihi.square.domain.user.entity.Customer;
import com.hihi.square.domain.user.entity.UserRankType;
import com.hihi.square.domain.user.entity.UserSocialLoginType;
import com.hihi.square.domain.user.entity.UserStatusType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
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
			.rank(UserRankType.valueOf(UserRankType.UR01.name()))
			.marketingAgree(marketingAgree)
			.createdAt(LocalDateTime.now())
			.modifiedAt(LocalDateTime.now())
			.lastLogin(LocalDateTime.now())
			.status(UserStatusType.valueOf(UserStatusType.ST01.name()))
			.social(UserSocialLoginType.DEFAULT)
			.point(0L)
			.build();

		return customer;
	}
}
