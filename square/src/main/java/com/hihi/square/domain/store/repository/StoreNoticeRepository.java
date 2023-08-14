package com.hihi.square.domain.store.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.hihi.square.domain.store.entity.Notice;
import com.hihi.square.domain.store.entity.Store;
import com.hihi.square.domain.user.entity.EmdAddress;
import com.hihi.square.domain.user.entity.User;

public interface StoreNoticeRepository extends JpaRepository<Notice, Integer> {

	@Override
	Notice save(Notice notice);

	Optional<Notice> findBySnoId(Integer snoId);

	List<Notice> findAllByStoreOrderByCreatedAtDesc(Store store);

	@Query("select n from Notice n where n.store = :store and n.state = 'PUBLIC' order by n.createdAt desc")
	List<Notice> findAllByStoreAndPublicOrderByCreatedAtDesc(Store store);

	@Query("select n from Notice n where n.state = 'PUBLIC' and n.emdAddress in  (:emdAddressList) order by n.createdAt desc")
	List<Notice> findAllByEmdListOrderByCreatedAtDesc(List<EmdAddress> emdAddressList);

	@Query("select n from Notice n where n.store in (select s from Store s, Dibs d where s = d.store and d.customer = :user) and n.state = 'PUBLIC' order by n.createdAt desc")
	List<Notice> findByUserDibs(User user);

	// @Query(value = "select * from dibs where sto_id=:stoId", nativeQuery = true)
	// List<Dibs> findDibsByStore(@Param("stoId") Integer stoId);
}
