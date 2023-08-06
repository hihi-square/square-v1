package com.hihi.square.domain.user.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hihi.square.domain.user.entity.AddressConnect;

public interface AddressConnectRepository extends JpaRepository<AddressConnect, Integer> {
	List<AddressConnect> findAllByFromId(Integer now);
}
