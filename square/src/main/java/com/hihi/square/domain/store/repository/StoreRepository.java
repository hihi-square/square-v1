package com.hihi.square.domain.store.repository;

import java.util.List;
import java.util.Optional;

import com.hihi.square.domain.store.entity.Store;
import com.hihi.square.domain.store.entity.StoreCategoryBig;
import com.hihi.square.domain.user.entity.EmdAddress;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface StoreRepository extends JpaRepository<Store, Integer> {
	Optional<Store> findByUid(String uid);

	Optional<Store> findByUsrId(Integer id);

	@Query("select s from Store s, StoreCategorySelected c where s = c.store and c.storeCategoryBig = :storeCategoryBig and s.emdAddress in (:emdAddressList)")
	List<Store> findByStoreCategoryBigAndEmdList(StoreCategoryBig storeCategoryBig, List<EmdAddress> emdAddressList);
}
