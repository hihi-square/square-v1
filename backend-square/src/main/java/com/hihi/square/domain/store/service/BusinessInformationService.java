package com.hihi.square.domain.store.service;

import com.hihi.square.domain.store.repository.BusinessInformationRepository;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BusinessInformationService {

	private final BusinessInformationRepository businessInformationRepository;

	public boolean validateDuplicateCompanyRegistration(Integer number) {
		return businessInformationRepository.findByCompanyRegistrationNumber(number).isPresent();
	}
}
