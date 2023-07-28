package com.hihi.square.domain.store.dto.request;

import java.time.LocalDate;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import com.hihi.square.domain.store.entity.BusinessInformation;

import lombok.Data;

@Data
public class BusinessInformationRegisterRequestDto {
	@NotEmpty
	private Integer companyRegistrationNumber;
	@NotNull
	private String ceoName;
	@NotNull
	private LocalDate openingDate;
	@NotNull
	private Integer corporateRegistrationNumber;
	@NotNull
	private String businessName;
	@NotNull
	private String businessFile;

	public BusinessInformation toEntity(){
		return BusinessInformation.builder()
			.companyRegistrationNumber(companyRegistrationNumber)
			.ceoName(ceoName)
			.openingDate(openingDate)
			.corporateRegistrationNumber(corporateRegistrationNumber)
			.businessName(businessName)
			.businessFile(businessFile)
			.build();
	}
}
