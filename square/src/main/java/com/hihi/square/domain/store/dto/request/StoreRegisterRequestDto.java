package com.hihi.square.domain.store.dto.request;

import java.time.LocalDateTime;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

import com.hihi.square.domain.store.entity.BankType;
import com.hihi.square.domain.store.entity.BusinessInformation;
import com.hihi.square.domain.store.entity.Store;
import com.hihi.square.domain.user.entity.EmdAddress;
import com.hihi.square.domain.user.entity.UserStatusType;

import lombok.Data;

@Data
public class StoreRegisterRequestDto{


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

	@NotNull
	private Long bCode;

	@NotEmpty
	private String address;
	@NotEmpty
	private String storeName;
	@NotEmpty
	private String storePhone;
	private String content;
	private BankType bank;
	@NotEmpty
	private String account;

	private Float latitude;
	private Float longitude;
	private String banner;
	private String logo;


	private BusinessInformationRegisterRequestDto businessInformation;

	public Store toEntityStore(EmdAddress emdAddress){
		return Store.builder()
			.uid(uid)
			.password(password)
			.nickname(nickname)
			.name(name)
			.phone(phone)
			.email(email)
			.marketingAgree(marketingAgree)
			.createdAt(LocalDateTime.now())
			.modifiedAt(LocalDateTime.now())
			.lastLogin(LocalDateTime.now())
			.status(UserStatusType.valueOf(UserStatusType.ST02.name()))
			.emdAddress(emdAddress)
			.address(address)
			.storeName(storeName)
			.storePhone(storePhone)
			.content(content)
			.bank(bank)
			.account(account)
			.latitude(latitude)
			.longitude(longitude)
			.banner(banner)
			.logo(logo)
			.build();
	}
	public BusinessInformation toEntityBusinessInformation(){
		return businessInformation.toEntity();
	}
}
