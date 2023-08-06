package com.hihi.square.domain.store.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.hihi.square.domain.menu.entity.Menu;
import com.hihi.square.domain.menu.repository.MenuRepository;
import com.hihi.square.domain.store.dto.request.StoreUpdateRequestDto;
import com.hihi.square.domain.store.dto.response.StoreInfoResponseDto;
import com.hihi.square.domain.store.dto.response.StoreListResponseDto;
import com.hihi.square.domain.store.entity.StoreCategoryBig;
import com.hihi.square.domain.store.entity.StoreCategorySelected;
import com.hihi.square.domain.store.repository.BusinessInformationRepository;
import com.hihi.square.domain.user.entity.User;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hihi.square.domain.store.entity.BusinessInformation;
import com.hihi.square.domain.store.entity.Store;
import com.hihi.square.domain.store.repository.StoreRepository;
import com.hihi.square.domain.user.entity.EmdAddress;
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

	@Transactional
	public void save(Store store, BusinessInformation businessInformation) {
		store.passwordEncode(passwordEncoder);
		storeRepository.save(store);
		businessInformation.setStore(store);
		biRepostiory.save(businessInformation);
	}

	@Transactional
	public void updateStoreInfo(Store store, StoreUpdateRequestDto request) {
		EmdAddress emdAddress = emdAddressRepository.findById(request.getAemId()).get();
		store.updateStoreInfo(request, emdAddress);
		storeRepository.save(store);
	}

	public Optional<Store> findByUsrId(Integer id) {return storeRepository.findByUsrId(id);}

	public Optional<Store> findByUid(String uid) {
		return storeRepository.findByUid(uid);
	}

	@Transactional(readOnly = true)
	public List<StoreListResponseDto> findByCategoryId(Integer id) {
		StoreCategoryBig storeCategoryBig = categoryService.findById(id).get();
		List<StoreCategorySelected> storeCategorySelectedList = storeCategoryService.findByStoreCategoryBig(storeCategoryBig);

		List<StoreListResponseDto> stores = new ArrayList<>();
		for(StoreCategorySelected s : storeCategorySelectedList) {
			Store store = s.getStore();
			List<Menu> menuList = menuRepository.findByUserAndPopularityIsTrue((User) store);

			String menuName = "";
			for(int i=0; i<menuList.size(); i++) {
				if(i == menuList.size()-1) {
					menuName += menuList.get(i).getName();
				} else {
					menuName += menuList.get(i).getName() + ", ";
				}
			}
			StoreListResponseDto res = StoreListResponseDto.builder()
					.storeId(store.getUsrId())
					.storeName(store.getStoreName())
					.content(store.getContent())
					.storeAddress(store.getAddress())
					.mainMenu(menuName)
					.build();
			stores.add(res);
		}
		return stores;

	}

	public List<StoreListResponseDto> findByCategoryIdAndSelectedEmd(Integer id, Integer emdId, Integer depth) {
		StoreCategoryBig storeCategoryBig = categoryService.findById(id).get();
		List<EmdAddress> emdAddressList = emdAddressService.getEmdAddressWithDepth(emdId, depth);
		List<Store> storeCategorySelectedList = storeRepository.findByStoreCategoryBigAndEmdList(storeCategoryBig, emdAddressList);
		System.out.println(emdAddressList.size());
		System.out.println(storeCategorySelectedList.size());
		List<StoreListResponseDto> stores = new ArrayList<>();
		for(Store s : storeCategorySelectedList) {
			List<Menu> menuList = menuRepository.findByUserAndPopularityIsTrue((User) s);
			String menuName = "";
			int size = menuList.size() < 3 ? menuList.size() : 3;
			for(int i=0; i<size; i++) {
				if(i == size-1) {
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
				.build();
			stores.add(res);
		}
		return stores;
	}
}
