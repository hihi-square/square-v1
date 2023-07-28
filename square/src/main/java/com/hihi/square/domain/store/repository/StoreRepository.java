package com.hihi.square.domain.store.repository;

import javax.persistence.EntityManager;

import com.hihi.square.domain.store.entity.BusinessInformation;
import org.springframework.stereotype.Repository;

import com.hihi.square.domain.store.entity.Store;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class StoreRepository {

	private final EntityManager em;

	public void save(Store store, BusinessInformation businessInformation){

		em.persist(store);
		businessInformation.setStore(store);
		em.persist(businessInformation);
	}

}
