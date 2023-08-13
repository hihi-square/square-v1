package com.hihi.square.domain.menu.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.hihi.square.domain.menu.dto.request.MenuOptionCategoryRequestDto;
import com.hihi.square.domain.menu.dto.request.MenuRequestDto;
import com.hihi.square.domain.menu.dto.response.CartStoreResponseDto;
import com.hihi.square.domain.menu.dto.response.MenuItemResponseDto;
import com.hihi.square.domain.menu.entity.Menu;
import com.hihi.square.domain.menu.entity.MenuCategory;
import com.hihi.square.domain.menu.entity.MenuStatus;
import com.hihi.square.domain.menu.repository.MenuCategoryRepository;
import com.hihi.square.domain.menu.repository.MenuOptionCategoryRepository;
import com.hihi.square.domain.menu.repository.MenuRepository;
import com.hihi.square.domain.store.entity.Store;
import com.hihi.square.domain.store.service.StoreService;
import com.hihi.square.domain.user.entity.User;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class MenuService {

	private final MenuRepository menuRepository;
	private final MenuCategoryRepository menuCategoryRepository;
	private final MenuOptionCategoryRepository menuOptionCategoryRepository;
	private final StoreService storeService;

	public void saveMenu(MenuRequestDto menuRequestDto) {
		Menu menu = menuRequestDto.toEntity();
		menu = menuRepository.save(menu);

		//메뉴 생성 시, default 옵션 카테고리 생성
		MenuOptionCategoryRequestDto optionCategoryRequestDto = MenuOptionCategoryRequestDto.builder()
			.menId(menu.getMenuId())
			.name("미분류")
			.sequence(0)
			.build();
		menuOptionCategoryRepository.save(optionCategoryRequestDto.toEntity());
	}

	public Menu updateMenu(MenuRequestDto menuRequestDto) {
		Optional<Menu> menu = menuRepository.findById(menuRequestDto.getId());
		if (!menu.isPresent()) {
			return null;
		}
		Menu saveMenu = menuRequestDto.toEntity();
		return menuRepository.save(saveMenu);
	}

	public void updateMenuList(User user, List<MenuRequestDto> menuRequestList) {
		for (MenuRequestDto menuRequestDto : menuRequestList) {
			Long menuId = menuRequestDto.getId();
			Integer usrId = user.getUsrId();
			Long categoryId = menuRequestDto.getCategoryId();
			String menuStatus = menuRequestDto.getStatus();
			Integer sequence = menuRequestDto.getSequence();
			menuRepository.updateMenuList(menuId, categoryId, menuStatus, sequence);
		}
	}

	public void deleteMenu(Menu menu) {
		//메뉴에 해당하는 옵션 카테고리, 옵션 삭제
		menuRepository.deleteOptionByMenuId(menu.getMenuId());
		menuRepository.deleteOptionCategoryByMenuId(menu.getMenuId());
		menuRepository.updateStatus(menu.getMenuId(), MenuStatus.OFF.name());
	}

	public List<Menu> findAll() {
		List<Menu> menuList = menuRepository.findAll();
		return menuList;
	}

	public List<Menu> findAllByUserId(Integer userId) {
		List<Menu> menuList = menuRepository.findAllByUserId(userId);
		return menuList;
	}

	public Menu findById(Long menuId) {
		Menu menu = menuRepository.findById(menuId).get();
		return menu;
	}

	// public boolean validateDuplicateMenuId(Long menuId) {
	// 	Optional<Menu> menu = menuRepository.findById(menuId);
	// 	return menu.isPresent();
	// }

	public boolean validateDuplicateCategoryId(Long categoryId) {
		Optional<MenuCategory> menu = menuCategoryRepository.findById(categoryId);
		return menu.isPresent();
	}

	// 장바구니 아이템 가게별로 정렬 후 반환
	public CartStoreResponseDto getMenuItemsById(List<Integer> itemIds) {

		Store store = (Store)menuRepository.findById(itemIds.get(0).longValue()).get().getUser();

		List<MenuItemResponseDto> menuItemResponseDtoList = new ArrayList<>();
		for(Integer itemId : itemIds) {
			Menu menu = menuRepository.findById(itemId.longValue()).get();
			MenuItemResponseDto dto = MenuItemResponseDto.builder()
					.menuId(menu.getMenuId())
					.menuName(menu.getName())
					.description(menu.getDescription())
					.status(menu.getStatus())
					.signature(menu.isSignature())
					.popularity(menu.isPopularity())
					.price(menu.getPrice())
					.menuThumbnail(menu.getThumbnail())
					.menuImage(menu.getImage())
					.build();

			menuItemResponseDtoList.add(dto);
		}

		CartStoreResponseDto cartStoreResponseDto = CartStoreResponseDto.builder()
				.storeId(store.getUsrId())
				.storeName(store.getName())
				.storeAddress(store.getAddress())
				.menuItems(menuItemResponseDtoList)
				.build();

		return cartStoreResponseDto;

	}
}
