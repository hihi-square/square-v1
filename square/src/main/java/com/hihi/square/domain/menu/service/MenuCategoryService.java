package com.hihi.square.domain.menu.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hihi.square.domain.menu.dto.request.MenuCategoryRequestDto;
import com.hihi.square.domain.menu.dto.response.MenuCategoryDto;
import com.hihi.square.domain.menu.dto.response.MenuItemResponseDto;
import com.hihi.square.domain.menu.entity.Menu;
import com.hihi.square.domain.menu.entity.MenuCategory;
import com.hihi.square.domain.menu.repository.MenuCategoryRepository;
import com.hihi.square.domain.menu.repository.MenuRepository;
import com.hihi.square.domain.user.entity.User;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class MenuCategoryService {
	private final MenuCategoryRepository menuCategoryRepository;
	private final MenuRepository menuRepository;

	public void saveMenuCategory(MenuCategory menuCategory) {
		menuCategoryRepository.save(menuCategory);
	}

	public MenuCategory updateMenuCategory(MenuCategoryRequestDto request) {
		Optional<MenuCategory> updateCategory = menuCategoryRepository.findById(request.getId());
		if (!updateCategory.isPresent()) {
			return null;
		}
		MenuCategory saveMenuCategory = request.toEntity();
		return menuCategoryRepository.save(saveMenuCategory);
	}

	public void updateMenuList(User user, List<MenuCategoryRequestDto> requestList) {
		for (MenuCategoryRequestDto request : requestList) {
			request.setUser(user);
			Long categoryId = request.getId();
			Integer sequence = request.getSequence();
			menuCategoryRepository.updateMenuCategoryList(categoryId, sequence);
		}
	}

	public void deleteMenuCategory(MenuCategory menuCategory) {
		menuCategoryRepository.delete(menuCategory);
	}

	public List<MenuCategory> findAll() {
		List<MenuCategory> menuCategoryList = menuCategoryRepository.findAll();
		return menuCategoryList;
	}

	public List<MenuCategory> findAllByUserId(Integer userId) {
		List<MenuCategory> menuCategoryList = menuCategoryRepository.findAllByUserId(userId);
		return menuCategoryList;
	}

	public MenuCategory findById(Long menuCategoryId) {
		MenuCategory menuCategory = menuCategoryRepository.findById(menuCategoryId).get();
		return menuCategory;
	}

	@Transactional(readOnly = true)
	public List<MenuCategoryDto> getAllMenuByCategory(User user) {

		List<MenuCategoryDto> response = new ArrayList<>();
		List<MenuCategory> menuCategories = menuCategoryRepository.findByUserOrderBySequence(user);
		for (MenuCategory menuCategory : menuCategories) {
			List<MenuItemResponseDto> menus = new ArrayList<>();

			List<Menu> menuList = menuRepository.findByMenuCategoryAndUserOrderBySequence(menuCategory, user);
			for (Menu menu : menuList) {
				MenuItemResponseDto menuItemResponseDto = MenuItemResponseDto.builder()
					.menuId(menu.getMenuId())
					.menuName(menu.getName())
					.description(menu.getDescription())
					.status(menu.getStatus())
					.popularity(menu.isPopularity())
					.price(menu.getPrice())
					.signature(menu.isSignature())
					.menuThumbnail(menu.getThumbnail())
					.menuImage(menu.getImage())
					.build();
				menus.add(menuItemResponseDto);
			}
			MenuCategoryDto menuCategoryDto = MenuCategoryDto.builder()
				.categoryId(menuCategory.getId())
				.categoryName(menuCategory.getName())
				.menuItems(menus)
				.build();
			response.add(menuCategoryDto);
		}
		return response;
	}
}
