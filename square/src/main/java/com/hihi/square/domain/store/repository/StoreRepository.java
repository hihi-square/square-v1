package com.hihi.square.domain.store.repository;

import javax.persistence.EntityManager;

import org.springframework.stereotype.Repository;

import com.hihi.square.domain.store.entity.Store;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class StoreRepository {

	private final EntityManager em;

	public void save(Store store){
		em.persist(store);
	}

}
