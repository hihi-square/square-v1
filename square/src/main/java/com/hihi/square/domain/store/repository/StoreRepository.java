package com.hihi.square.domain.store.repository;

import java.util.List;
import java.util.Optional;

import com.hihi.square.domain.store.entity.Store;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StoreRepository extends JpaRepository<Store, Integer> {
	Optional<Store> findByUid(String uid);

	Optional<Store> findByUsrId(Integer id);
}
