package com.hihi.square.domain.coupon.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hihi.square.domain.coupon.dto.request.StoreCouponRegistDto;
import com.hihi.square.domain.store.dto.response.EmdStoreCouponSaleDto;
import com.hihi.square.domain.coupon.entity.Coupon;
import com.hihi.square.domain.coupon.repository.CouponRepository;
import com.hihi.square.domain.menu.entity.Menu;
import com.hihi.square.domain.menu.repository.MenuRepository;
import com.hihi.square.domain.store.dto.response.StoreCategorySelectedDto;
import com.hihi.square.domain.store.entity.Store;
import com.hihi.square.domain.store.entity.StoreCategorySelected;
import com.hihi.square.domain.store.repository.StoreCategoryRepository;
import com.hihi.square.domain.store.repository.StoreRepository;
import com.hihi.square.domain.store.service.StoreService;
import com.hihi.square.domain.user.entity.EmdAddress;
import com.hihi.square.domain.user.entity.User;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CouponService {

	private final CouponRepository couponRepository;
	private final StoreRepository storeRepository;
	private final StoreService storeService;

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

	public Optional<Coupon> findById(Integer couponId) {
		return couponRepository.findById(couponId);
	}

	public Integer countAvailableCoupon(Store store) {
		return couponRepository.countByStoreAndStartAtIsBeforeAndExpiredAtIsAfter(store, LocalDateTime.now(), LocalDateTime.now());
	}
	private List<StoreCategorySelectedDto> categories = new ArrayList<>();

	public List<EmdStoreCouponSaleDto> findByEmdAddressWithAvailableCoupon(EmdAddress emdAddress) {
		List<Store> stores = storeRepository.findByEmdAddressAndHaveAvailableCoupon(emdAddress, LocalDateTime.now());
		List<EmdStoreCouponSaleDto> result = storeService.storeToEmdStoreCouponSaleDto(stores);
		return result;
	}
}
