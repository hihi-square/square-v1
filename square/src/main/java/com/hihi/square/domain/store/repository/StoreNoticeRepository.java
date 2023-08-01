package com.hihi.square.domain.store.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hihi.square.domain.store.entity.Notice;

public interface StoreNoticeRepository extends JpaRepository<Notice, Integer> {
}
