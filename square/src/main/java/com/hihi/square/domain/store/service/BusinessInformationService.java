package com.hihi.square.domain.store.service;

import org.springframework.stereotype.Service;

import com.hihi.square.domain.store.repository.BusinessInformationRepostiory;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BusinessInformationService {

	private final BusinessInformationRepostiory businessInformationRepostiory;
	public boolean validateDuplicateCompanyRegistration(Integer number) {
		return businessInformationRepostiory.findByCompanyRegistrationNumber(number).isPresent();
	}
}
