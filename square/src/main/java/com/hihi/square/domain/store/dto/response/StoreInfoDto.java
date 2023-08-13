package com.hihi.square.domain.store.dto.response;

import javax.persistence.Column;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;

import com.hihi.square.domain.store.entity.BankType;
import com.hihi.square.domain.user.entity.EmdAddress;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class StoreInfoDto {

	private EmdAddress emdAddress;

	private String address;
	private String storeName;
	private String storePhone;
	private String content;
	private BankType bank;
	private String account;
	private String logo;
	private String openTime;
	private Float latitude;
	private Float longitude;
	private String hashtags;
	@Column(name="is_opened")
	private Boolean isOpened;

}
