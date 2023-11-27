package com.hihi.square.domain.coupon.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.hihi.square.domain.coupon.entity.Coupon;
import com.hihi.square.domain.coupon.entity.IssueCoupon;
import com.hihi.square.domain.coupon.repository.IssueCouponRepository;
import com.hihi.square.domain.store.entity.Store;
import com.hihi.square.domain.user.entity.Customer;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class IssueCouponService {
	private final IssueCouponRepository issueCouponRepository;

	public Boolean isAlreadyIssued(Customer customer, Coupon coupon) {
		return issueCouponRepository.findByCustomerAndCoupon(customer, coupon, LocalDateTime.now()).isPresent();
	}

	public Integer getIssueNumber(Coupon coupon) {
		return issueCouponRepository.countByCoupon(coupon);
	}

	public Integer getUsedNumber(Coupon coupon) {
		return issueCouponRepository.countByCouponAndIsUsed(coupon, true);
	}

	public void issueCoupon(Customer customer, Coupon coupon) {
		IssueCoupon issueCoupon = IssueCoupon.builder()
			.customer(customer)
			.coupon(coupon)
			.createdAt(LocalDateTime.now())
			.expiredAt(coupon.getExpiredAt())
			.isUsed(false)
			.build();
		issueCouponRepository.save(issueCoupon);
	}

	public List<IssueCoupon> findByCustomer(Customer customer) {
		return issueCouponRepository.findByCustomer(customer);
	}

	public List<IssueCoupon> findAllAvailableCouponByToStore(Store store, Customer customer) {
		return issueCouponRepository.findByToStoreAndCustomerAvailable(store, customer, LocalDateTime.now());
	}

	public Optional<IssueCoupon> findById(Integer uicId) {
		return issueCouponRepository.findById(uicId);
	}

	public void save(IssueCoupon issueCoupon){
		issueCouponRepository.save(issueCoupon);
	}
}
