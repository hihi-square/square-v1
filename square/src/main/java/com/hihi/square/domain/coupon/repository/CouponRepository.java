package com.hihi.square.domain.coupon.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.hihi.square.domain.coupon.entity.Coupon;
import com.hihi.square.domain.store.entity.Store;

public interface CouponRepository extends JpaRepository<Coupon, Integer> {

	@Query("select c from Coupon c where c.store = :store and :now between c.startAt and c.expiredAt")
	List<Coupon> findByAllAvailableStoreCoupon(Store store, LocalDateTime now);
}
