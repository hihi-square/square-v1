package com.hihi.square.domain.coupon.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hihi.square.domain.coupon.dto.request.StoreCouponRegistDto;
import com.hihi.square.domain.coupon.entity.Coupon;
import com.hihi.square.domain.coupon.entity.DiscountType;
import com.hihi.square.domain.coupon.repository.CouponRepository;
import com.hihi.square.domain.store.entity.Store;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CouponService {

	private final CouponRepository couponRepository;

	@Transactional
	public void createCoupon(Store store, StoreCouponRegistDto request) {
		Coupon coupon = Coupon.builder()
			.store(store)
			.name(request.getName())
			.content(request.getContent())
			.createdAt(LocalDateTime.now())
			.startAt(request.getStartAt())
			.expiredAt(request.getExpiredAt())
			.discountType(request.getDiscountType())
			.rate(request.getRate())
			.minOrderPrice(request.getMinOrderPrice())
			.maxDiscountPrice(request.getMaxDiscountPrice())
			.build();
		couponRepository.save(coupon);
	}

	public List<Coupon> findAllAvailableCouponByStore(Store store) {
		return couponRepository.findByAllAvailableStoreCoupon(store, LocalDateTime.now());
	}

	public List<Coupon> findAllByStore(Store store) {
		return couponRepository.findAllByStore(store);
	}
}
