package com.hihi.square.domain.store.dto.request;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;

import com.hihi.square.domain.store.entity.BankType;

import lombok.Data;

@Data
public class StoreUpdateRequestDto {
	private String storeName;
	private String storePhone;
	private Integer aemId;
	private String address;
	private String content;
	@Enumerated(EnumType.STRING)
	private BankType bank;
	private String account;
}
