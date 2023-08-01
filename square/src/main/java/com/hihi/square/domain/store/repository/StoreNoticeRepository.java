package com.hihi.square.domain.store.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hihi.square.domain.store.entity.Notice;
import com.hihi.square.domain.store.entity.Store;
import com.hihi.square.domain.user.entity.User;

public interface StoreNoticeRepository extends JpaRepository<Notice, Integer> {

	List<Notice> findAllByStoreOrderByCreatedAt(Store store);
}
