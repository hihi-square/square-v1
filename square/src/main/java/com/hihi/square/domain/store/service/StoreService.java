package com.hihi.square.domain.store.service;

import java.util.Optional;

import com.hihi.square.domain.store.dto.request.StoreUpdateRequestDto;
import com.hihi.square.domain.store.repository.BusinessInformationRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hihi.square.domain.store.entity.BusinessInformation;
import com.hihi.square.domain.store.entity.Store;
import com.hihi.square.domain.store.repository.StoreRepository;
import com.hihi.square.domain.user.entity.EmdAddress;
import com.hihi.square.domain.user.repository.EmdAddressRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class StoreService {

	private final StoreRepository storeRepository;
	private final BusinessInformationRepository biRepostiory;
	private final PasswordEncoder passwordEncoder;
	private final EmdAddressRepository emdAddressRepository;

	@Transactional
	public void save(Store store, BusinessInformation businessInformation) {
		store.passwordEncode(passwordEncoder);
		storeRepository.save(store);
		businessInformation.setStore(store);
		biRepostiory.save(businessInformation);
	}

	@Transactional
	public void updateStoreInfo(Store store, StoreUpdateRequestDto request) {
		EmdAddress emdAddress = emdAddressRepository.findById(request.getAemId()).get();
		store.updateStoreInfo(request, emdAddress);
		storeRepository.save(store);
	}

	public Optional<Store> findByUid(String uid) {
		return  storeRepository.findByUid(uid);
	}
}
