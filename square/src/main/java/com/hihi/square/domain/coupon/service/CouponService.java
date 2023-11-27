package com.hihi.square.domain.coupon.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hihi.square.domain.coupon.dto.request.StoreCouponRegistDto;
import com.hihi.square.domain.coupon.dto.response.IssueRequestCouponDto;
import com.hihi.square.domain.coupon.entity.CouponStatus;
import com.hihi.square.domain.coupon.entity.DiscountType;
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
	public void createCoupon(Store toStore, Store fromStore,  StoreCouponRegistDto request) {
		Coupon coupon = Coupon.builder()
			.toStore(toStore)
			.fromStore(fromStore)
			.name(request.getName())
			.content(request.getContent())
			.createdAt(LocalDateTime.now())
			.startAt(request.getStartAt())
			.expiredAt(request.getExpiredAt())
			.discountType(request.getDiscountType())
			.rate(request.getRate())
			.minOrderPrice(request.getMinOrderPrice())
			.maxDiscountPrice(request.getMaxDiscountPrice())
			.status(toStore.getUsrId() == fromStore.getUsrId() ? CouponStatus.ISSUE : CouponStatus.PENDING)
			.issueCondition(request.getIssueCondition())
			.build();
		couponRepository.save(coupon);
	}

	public List<Coupon> findAllAvailableCouponByFromStore(Store store) {
		return couponRepository.findByAllAvailableFromStoreCoupon(store, LocalDateTime.now());
	}

	public List<Coupon> findAllByStore(Store store) {
		return couponRepository.findAllByToStoreOrFromStore(store, store);
	}

	public Optional<Coupon> findById(Integer couponId) {
		return couponRepository.findById(couponId);
	}

	public Integer countAvailableCoupon(Store store) {
		return couponRepository.countByFromStoreAndStartAtIsBeforeAndExpiredAtIsAfter(store, LocalDateTime.now(), LocalDateTime.now());
	}
	private List<StoreCategorySelectedDto> categories = new ArrayList<>();

	public List<EmdStoreCouponSaleDto> findByEmdAddressWithAvailableCoupon(List<EmdAddress> emdAddressList) {
		List<Store> stores = storeRepository.findByEmdAddressAndHaveAvailableCoupon(emdAddressList, LocalDateTime.now());
		List<EmdStoreCouponSaleDto> result = storeService.storeToEmdStoreCouponSaleDto(stores);
		return result;
	}



	public List<IssueRequestCouponDto> findIssueRequestCouponByStore(Store store) {
		List<Coupon> couponList = couponRepository.findIssueRequestCouponByStore(store, LocalDateTime.now());
		List<IssueRequestCouponDto> result = new ArrayList<>();
		for(Coupon coupon : couponList) {
			result.add(
				IssueRequestCouponDto.builder()
					.id(coupon.getId())
					.name(coupon.getName())
					.content(coupon.getContent())
					.toStoreId(coupon.getToStore().getUsrId())
					.toStoreName(coupon.getToStore().getStoreName())
					.createdAt(coupon.getCreatedAt())
					.startAt(coupon.getStartAt())
					.expiredAt(coupon.getExpiredAt())
					.discountType(coupon.getDiscountType())
					.rate(coupon.getRate())
					.minOrderPrice(coupon.getMinOrderPrice())
					.maxDiscountPrice(coupon.getMaxDiscountPrice())
					.issueCondition(coupon.getIssueCondition())
					.build()
			);
		}
		return result;
	}

	@Transactional
	public void acceptRequestCoupon(Coupon coupon, CouponStatus status) {
		coupon.acceptRequestCoupon(status);
		couponRepository.save(coupon);
	}
}
