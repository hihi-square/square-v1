package com.hihi.square.domain.store.dto.response;

import java.util.List;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;

import com.hihi.square.domain.image.entity.Image;
import com.hihi.square.domain.store.entity.BankType;
import com.hihi.square.domain.user.entity.EmdAddress;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class StoreInfoResponseDto {

	private String storeName;
	private String storePhone;
	private EmdAddress emdAddress;
	private String address;
	private String content;
	@Enumerated(EnumType.STRING)
	private BankType bank;
	private String account;
	private String logo;
	private Boolean isOpened;
	private Float latitude;
	private Float longitude;
	private String banner;

}
