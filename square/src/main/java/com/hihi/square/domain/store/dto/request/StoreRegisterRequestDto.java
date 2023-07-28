package com.hihi.square.domain.store.dto.request;

import java.time.LocalDateTime;

import javax.validation.constraints.NotEmpty;

import com.hihi.square.domain.store.entity.BankType;
import com.hihi.square.domain.store.entity.BusinessInformation;
import com.hihi.square.domain.store.entity.Store;
import com.hihi.square.domain.user.dto.request.UserRegisterDto;
import com.hihi.square.domain.user.entity.UserStatusType;

import lombok.Data;

@Data
public class StoreRegisterRequestDto extends UserRegisterDto {


	@NotEmpty
	private Integer aemId;
	@NotEmpty
	private String address;
	@NotEmpty
	private String storeName;
	@NotEmpty
	private String storePhone;
	private String content;
	@NotEmpty
	private BankType bank;
	@NotEmpty
	private String account;

	@NotEmpty
	private BusinessInformationRegisterRequestDto businessInformation;

	public Store toEntityStore(){
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
			.address(address)
			.storeName(storeName)
			.storePhone(storePhone)
			.content(content)
			.bank(bank)
			.account(account)
			.build();
	}
	public BusinessInformation toEntityBusinessInformation(){
		return businessInformation.toEntity();
	}
}
