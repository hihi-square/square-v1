package com.hihi.square.domain.store.repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import com.hihi.square.domain.store.dto.response.StoreListResponseDto;
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

	@Query("select s from Store s, Coupon c where s = c.fromStore and s.emdAddress in (:emdAddress) and :now between c.startAt and c.expiredAt group by s")
	List<Store> findByEmdAddressAndHaveAvailableCoupon(EmdAddress emdAddress, LocalDateTime now);

	@Query("select s from Store s, Sale sale where s = sale.store and s.emdAddress in (:emdAddress) and :now between sale.startedAt and sale.realFinishedAt group by s")
	List<Store> findByEmdAddressAndHaveProgressSale(EmdAddress emdAddress, LocalDateTime now);

	@Query("select store from Store store where store.emdAddress in (:emdAddress) and 0 < (select count(*) from Coupon c where store = c.fromStore and :now between c.startAt and c.expiredAt) and 0 < (select count(*) from Sale sale where store = sale.store and :now between sale.startedAt and sale.realFinishedAt)")
	List<Store> findByEmdAddressAndHaveProgressSaleAndAvailableCoupon(EmdAddress emdAddress, LocalDateTime now);

	@Query("select s from Store s where s.emdAddress in (:emdAddressList) and (s.storeName like concat('%', :query , '%') or (s.hashtags like concat('%', :query, '%')))")
	List<Store> findByEmdAddressAndQuery(List<EmdAddress> emdAddressList, String query);
}
