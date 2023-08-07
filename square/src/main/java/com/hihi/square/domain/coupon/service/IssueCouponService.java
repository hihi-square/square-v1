package com.hihi.square.domain.coupon.service;

import org.springframework.stereotype.Service;

import com.hihi.square.domain.coupon.entity.Coupon;
import com.hihi.square.domain.coupon.repository.IssueCouponRepository;
import com.hihi.square.domain.user.entity.Customer;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class IssueCouponService {
	private final IssueCouponRepository issueCouponRepository;

	public Boolean isAlreadyIssued(Customer customer, Coupon coupon) {
		return issueCouponRepository.findByCustomerAndCoupon(customer, coupon).isPresent();
	}
}
