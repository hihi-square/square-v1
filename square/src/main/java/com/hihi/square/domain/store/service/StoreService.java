package com.hihi.square.domain.store.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hihi.square.domain.menu.dto.request.MenuCategoryRequestDto;
import com.hihi.square.domain.menu.entity.Menu;
import com.hihi.square.domain.menu.repository.MenuRepository;
import com.hihi.square.domain.menu.service.MenuCategoryService;
import com.hihi.square.domain.review.service.ReviewService;
import com.hihi.square.domain.store.dto.request.StoreUpdateRequestDto;
import com.hihi.square.domain.store.dto.response.EmdStoreCouponSaleDto;
import com.hihi.square.domain.store.dto.response.StoreCategorySelectedDto;
import com.hihi.square.domain.store.dto.response.StoreListResponseDto;
import com.hihi.square.domain.store.dto.response.StoreSearchListDto;
import com.hihi.square.domain.store.entity.BusinessInformation;
import com.hihi.square.domain.store.entity.Store;
import com.hihi.square.domain.store.entity.StoreCategoryBig;
import com.hihi.square.domain.store.entity.StoreCategorySelected;
import com.hihi.square.domain.store.repository.BusinessInformationRepository;
import com.hihi.square.domain.store.repository.StoreCategoryRepository;
import com.hihi.square.domain.store.repository.StoreRepository;
import com.hihi.square.domain.user.entity.EmdAddress;
import com.hihi.square.domain.user.entity.User;
import com.hihi.square.domain.user.repository.EmdAddressRepository;
import com.hihi.square.domain.user.service.EmdAddressService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class StoreService {

	private final StoreRepository storeRepository;
	private final BusinessInformationRepository biRepostiory;
	private final PasswordEncoder passwordEncoder;
	private final EmdAddressRepository emdAddressRepository;
	private final StoreCategoryService storeCategoryService;
	private final CategoryService categoryService;
	private final MenuRepository menuRepository;
	private final EmdAddressService emdAddressService;
	private final StoreCategoryRepository storeCategoryRepository;
	private final ReviewService reviewService;
	private final MenuCategoryService menuCategoryService;

	@Transactional
	public void save(Store store, BusinessInformation businessInformation) {
		store.passwordEncode(passwordEncoder);
		storeRepository.save(store);
		businessInformation.setStore(store);
		biRepostiory.save(businessInformation);

		//회원 가입 시, 메뉴 default category 생성
		MenuCategoryRequestDto menuCategoryRequestDto = MenuCategoryRequestDto.builder()
			.user(store)
			.name("미분류")
			.sequence(0)
			.build();
		menuCategoryService.saveMenuCategory(menuCategoryRequestDto.toEntity());
	}

	@Transactional
	public void updateStoreInfo(Store store, StoreUpdateRequestDto request) {
		EmdAddress emdAddress = emdAddressRepository.findByAdmCode(request.getBcode()).get();
		store.updateStoreInfo(request, emdAddress);
		storeRepository.save(store);
	}

	public Optional<Store> findByUsrId(Integer id) {
		return storeRepository.findByUsrId(id);
	}

	public Optional<Store> findByUid(String uid) {
		return storeRepository.findByUid(uid);
	}

	@Transactional(readOnly = true)
	public List<StoreListResponseDto> findByCategoryId(Integer id) {
		StoreCategoryBig storeCategoryBig = categoryService.findById(id).get();
		List<StoreCategorySelected> storeCategorySelectedList = storeCategoryService.findByStoreCategoryBig(
			storeCategoryBig);

		List<StoreListResponseDto> stores = new ArrayList<>();
		for (StoreCategorySelected s : storeCategorySelectedList) {
			Store store = s.getStore();
			List<Menu> menuList = menuRepository.findByUserAndPopularityIsTrue((User)store);

			// 인기메뉴가 3개 이상이면 3개만 가져오도록 함
			int size = menuList.size() >= 3 ? 3 : menuList.size();

			String menuName = "";
			for (int i = 0; i < size; i++) {
				if (i == size - 1) {
					menuName += menuList.get(i).getName();
				} else {
					menuName += menuList.get(i).getName() + ", ";
				}
			}
			StoreListResponseDto res = StoreListResponseDto.builder()
<<<<<<< HEAD
					.scbId(id)
					.storeId(store.getUsrId())
					.storeName(store.getStoreName())
					.content(store.getContent())
					.storeAddress(store.getAddress())
					.mainMenu(menuName)
					.logo(store.getLogo())
					.isOpen(store.getIsOpened())
					.build();
=======
				.scbId(id)
				.storeId(store.getUsrId())
				.storeName(store.getStoreName())
				.content(store.getContent())
				.storeAddress(store.getAddress())
				.mainMenu(menuName)
				.logo(store.getLogo())
				.build();
>>>>>>> 6debec19235b55c6d5cbc5ae68b901b8b3410ad4
			stores.add(res);
		}
		return stores;

	}

	public List<StoreListResponseDto> findByCategoryIdAndSelectedEmd(Integer id, Integer emdId, Integer depth) {
		StoreCategoryBig storeCategoryBig = categoryService.findById(id).get();
		List<EmdAddress> emdAddressList = emdAddressService.getEmdAddressWithDepth(emdId, depth);
		List<Store> storeCategorySelectedList = storeRepository.findByStoreCategoryBigAndEmdList(storeCategoryBig,
			emdAddressList);
		List<StoreListResponseDto> stores = new ArrayList<>();
		for (Store s : storeCategorySelectedList) {
			List<Menu> menuList = menuRepository.findByUserAndPopularityIsTrue((User)s);
			String menuName = "";
			int size = menuList.size() < 3 ? menuList.size() : 3;
			for (int i = 0; i < size; i++) {
				if (i == size - 1) {
					menuName += menuList.get(i).getName();
				} else {
					menuName += menuList.get(i).getName() + ", ";
				}
			}
			StoreListResponseDto res = StoreListResponseDto.builder()
				.storeId(s.getUsrId())
				.storeName(s.getStoreName())
				.content(s.getContent())
				.storeAddress(s.getAddress())
				.mainMenu(menuName)
				.logo(s.getLogo())
				.isOpen(s.getIsOpened())
				.build();
			stores.add(res);
		}
		return stores;
	}

	public List<EmdStoreCouponSaleDto> storeToEmdStoreCouponSaleDto(List<Store> stores) {
		List<EmdStoreCouponSaleDto> result = new ArrayList<>();
		for (Store store : stores) {
			List<StoreCategorySelectedDto> categories = new ArrayList<>();
			List<StoreCategorySelected> selected = storeCategoryRepository.findByStore(store);
			for (StoreCategorySelected s : selected) {
				categories.add(
					StoreCategorySelectedDto.builder()
						.categoryId(s.getStoreCategoryBig().getScbId())
						.categoryName(s.getStoreCategoryBig().getName())
						.build()
				);
			}
			List<Menu> menuList = menuRepository.findByUserAndPopularityIsTrue((User)store);

			// 인기메뉴가 3개 이상이면 3개만 가져오도록 함
			int size = menuList.size() >= 3 ? 3 : menuList.size();

			String menuName = "";
			for (int i = 0; i < size; i++) {
				if (i == size - 1) {
					menuName += menuList.get(i).getName();
				} else {
					menuName += menuList.get(i).getName() + ", ";
				}
			}
			result.add(
				EmdStoreCouponSaleDto.builder()
					.storeId(store.getUsrId())
					.storeName(store.getStoreName())
					.content(store.getContent())
					.storeAddress(store.getAddress())
					.thumbnail(store.getProfileThumb())
					.latitude(store.getLatitude())
					.longitude(store.getLongitude())
					.rating(reviewService.getAverageRating(store))
					.categories(categories)
					.mainMenu(menuName)
					.build()
			);
		}
		return result;
	}

	@Transactional
	public void setStoreOpenClose(Store store, boolean isOpen) {
		store.updateOpen(isOpen);
		storeRepository.save(store);
	}

	public List<StoreSearchListDto> findByEmdAddressAndQuery(EmdAddress emdAddress, Integer depth, String query) {
		List<StoreSearchListDto> result = new ArrayList<>();
		List<EmdAddress> emdAddressList = emdAddressService.getEmdAddressWithDepth(emdAddress.getAemId(), depth);
		List<Store> stores = storeRepository.findByEmdAddressAndQuery(emdAddressList, query);
		for (Store store : stores) {
			List<Menu> menuList = menuRepository.findByUserAndPopularityIsTrue((User)store);
			String menuName = "";
			int size = menuList.size() < 3 ? menuList.size() : 3;
			for (int i = 0; i < size; i++) {
				if (i == size - 1) {
					menuName += menuList.get(i).getName();
				} else {
					menuName += menuList.get(i).getName() + ", ";
				}
			}
			result.add(
				StoreSearchListDto.builder()
					.storeId(store.getUsrId())
					.storeName(store.getStoreName())
					.content(store.getContent())
					.storeAddress(store.getAddress())
					.mainMenu(menuName)
					.logo(store.getLogo())
					.latitude(store.getLatitude())
					.longitude(store.getLongitude())
					.rating(
						reviewService.getAverageRating(store)
					)
					.isOpened(store.getIsOpened())
					.hasCoupon(false) // 일단 false로 두기
					.build()
			);
		}
		return result;
	}

	public List<StoreSearchListDto> findByEmdAddress(EmdAddress emdAddress, Integer depth) {
		List<StoreSearchListDto> result = new ArrayList<>();
		List<EmdAddress> emdAddressList = emdAddressService.getEmdAddressWithDepth(emdAddress.getAemId(), depth);
		List<Store> stores = storeRepository.findByEmdAddress(emdAddressList);
		for (Store store : stores) {
			List<Menu> menuList = menuRepository.findByUserAndPopularityIsTrue((User)store);
			String menuName = "";
			int size = menuList.size() < 3 ? menuList.size() : 3;
			for (int i = 0; i < size; i++) {
				if (i == size - 1) {
					menuName += menuList.get(i).getName();
				} else {
					menuName += menuList.get(i).getName() + ", ";
				}
			}
			result.add(
				StoreSearchListDto.builder()
					.storeId(store.getUsrId())
					.storeName(store.getStoreName())
					.content(store.getContent())
					.storeAddress(store.getAddress())
					.mainMenu(menuName)
					.logo(store.getLogo())
					.latitude(store.getLatitude())
					.longitude(store.getLongitude())
					.rating(
						reviewService.getAverageRating(store)
					)
					.isOpened(store.getIsOpened())
					.hasCoupon(false) // 일단 false로 두기
					.build()
			);
		}
		return result;
	}
}
