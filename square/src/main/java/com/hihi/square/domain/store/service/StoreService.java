package com.hihi.square.domain.store.service;

import com.hihi.square.domain.store.repository.BusinessInformationRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hihi.square.domain.store.entity.BusinessInformation;
import com.hihi.square.domain.store.entity.Store;
import com.hihi.square.domain.store.repository.StoreRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class StoreService {

	private final StoreRepository storeRepository;
	private final BusinessInformationRepository biRepostiory;

	@Transactional
	public void save(Store store, BusinessInformation businessInformation) {
		storeRepository.save(store);
		businessInformation.setStore(store);
		biRepostiory.save(businessInformation);
	}
}
