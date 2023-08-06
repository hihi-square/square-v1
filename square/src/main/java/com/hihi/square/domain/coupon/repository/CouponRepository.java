package com.hihi.square.domain.coupon.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hihi.square.domain.coupon.entity.Coupon;

public interface CouponRepository extends JpaRepository<Coupon, Integer> {

}
