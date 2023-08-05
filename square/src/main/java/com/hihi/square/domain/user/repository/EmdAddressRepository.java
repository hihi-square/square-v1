package com.hihi.square.domain.user.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.hihi.square.domain.user.entity.EmdAddress;

public interface EmdAddressRepository extends JpaRepository<EmdAddress, Integer> {

	@Query("select e from EmdAddress e where e.sidoName = :sidoName and e.siggName = :siggName and e.name = :emdName")
	Optional<EmdAddress> findByNames(String sidoName, String siggName, String emdName);

	@Query("select e from EmdAddress e where e.sidoName like :sidoName and e.siggName like :siggName and e.name like :emdName")
	Optional<EmdAddress> findByLikeNames(String sidoName, String siggName, String emdName);
}
