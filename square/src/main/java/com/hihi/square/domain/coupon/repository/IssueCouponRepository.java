package com.hihi.square.domain.coupon.repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import net.bytebuddy.asm.Advice;

import com.hihi.square.domain.coupon.entity.Coupon;
import com.hihi.square.domain.coupon.entity.IssueCoupon;
import com.hihi.square.domain.store.entity.Store;
import com.hihi.square.domain.user.entity.Customer;

public interface IssueCouponRepository extends JpaRepository<IssueCoupon, Integer> {

	// 사용 가능한(만료 전인) 쿠폰이 존재
	@Query("select ic from IssueCoupon ic where ic.coupon = :coupon and ic.customer = :customer and :now between ic.createdAt and ic.expiredAt and ic.isUsed = false")
	Optional<IssueCoupon> findByCustomerAndCoupon(Customer customer, Coupon coupon, LocalDateTime now);

	Integer countByCoupon(Coupon coupon);

	Integer countByCouponAndIsUsed(Coupon coupon, boolean isUsed);

	List<IssueCoupon> findByCustomer(Customer customer);

	@Query("select ic from IssueCoupon ic, Coupon c where ic.coupon = c and c.toStore = :store and ic.customer = :customer and ic.expiredAt > :now and ic.isUsed = false")
	List<IssueCoupon> findByToStoreAndCustomerAvailable(Store store, Customer customer, LocalDateTime now);
}
