package com.hihi.square.domain.store.dto.request;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;

import com.hihi.square.domain.store.entity.BankType;

import lombok.Data;

@Data
public class StoreUpdateRequestDto {
	private String storeName;
	private String storePhone;
	private Long bCode;
	private String address;
	private String content;
	private BankType bank;
	private String account;
	private String hashtags;
	private String banner;
	private String logo;
	private Float latitude;
	private Float longitude;
}
