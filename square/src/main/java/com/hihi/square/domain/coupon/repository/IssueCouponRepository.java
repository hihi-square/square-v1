package com.hihi.square.domain.coupon.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.hihi.square.domain.coupon.entity.Coupon;
import com.hihi.square.domain.coupon.entity.IssueCoupon;
import com.hihi.square.domain.user.entity.Customer;

public interface IssueCouponRepository extends JpaRepository<IssueCoupon, Integer> {
	Optional<IssueCoupon> findByCustomerAndCoupon(Customer customer, Coupon coupon);

	Integer countByCoupon(Coupon coupon);

	Integer countByCouponAndIsUsed(Coupon coupon, boolean isUsed);

	List<IssueCoupon> findByCustomer(Customer customer);
}
