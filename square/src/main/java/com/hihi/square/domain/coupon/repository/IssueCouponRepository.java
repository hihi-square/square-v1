package com.hihi.square.domain.coupon.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hihi.square.domain.coupon.entity.Coupon;
import com.hihi.square.domain.coupon.entity.IssueCoupon;
import com.hihi.square.domain.user.entity.Customer;

public interface IssueCouponRepository extends JpaRepository<IssueCoupon, Integer> {
	Optional<IssueCoupon> findByCustomerAndCoupon(Customer customer, Coupon coupon);
}
