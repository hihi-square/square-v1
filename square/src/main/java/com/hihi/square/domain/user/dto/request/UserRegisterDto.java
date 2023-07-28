package com.hihi.square.domain.user.dto.request;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

public abstract class UserRegisterDto {

	@NotEmpty
	protected String uid;
	@NotEmpty
	protected String password;
	@NotEmpty
	protected String nickname;
	@NotEmpty
	protected String name;
	@NotEmpty
	protected String phone;
	@NotEmpty
	@Pattern(regexp = "[a-zA-z0-9]+@[a-zA-z]+[.]+[a-zA-z.]+")
	protected String email;
	@NotNull
	protected boolean marketingAgree;
}
