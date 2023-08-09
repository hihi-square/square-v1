package com.hihi.square.domain.coupon.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.hihi.square.domain.coupon.entity.Coupon;
import com.hihi.square.domain.store.entity.Store;

public interface CouponRepository extends JpaRepository<Coupon, Integer> {

	@Query("select c from Coupon c where c.fromStore = :store and :now between c.startAt and c.expiredAt and c.status = 'ISSUE'")
	List<Coupon> findByAllAvailableFromStoreCoupon(Store store, LocalDateTime now);

	// List<Coupon> findAllByFromStore(Store store);

	Integer countByFromStoreAndStartAtIsBeforeAndExpiredAtIsAfter(Store store, LocalDateTime now, LocalDateTime now1);

	List<Coupon> findAllByToStoreOrFromStore(Store store, Store store1);

}
