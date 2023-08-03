package com.hihi.square.domain.menu.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.hihi.square.domain.menu.dto.response.MenuCategoryResponseDto;
import com.hihi.square.domain.menu.dto.response.MenuItemResponseDto;
import com.hihi.square.domain.menu.entity.Menu;
import com.hihi.square.domain.menu.repository.MenuRepository;
import com.hihi.square.domain.user.entity.User;
import org.springframework.stereotype.Service;

import com.hihi.square.domain.menu.entity.MenuCategory;
import com.hihi.square.domain.menu.repository.MenuCategoryRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class MenuCategoryService {
	private final MenuCategoryRepository menuCategoryRepository;
	private final MenuRepository menuRepository;

	public void saveMenuCategory(MenuCategory menuCategory) {
		menuCategoryRepository.save(menuCategory);
	}

	public MenuCategory updateMenuCategory(MenuCategory menuCategory) {
		Optional<MenuCategory> updateCategory = menuCategoryRepository.findById(menuCategory.getId());
		if (!updateCategory.isPresent()) {
			return null;
		}
		return menuCategoryRepository.save(updateCategory.get());
	}

	@Transactional(readOnly = true)
	public List<MenuCategoryResponseDto> getAllMenuByCategory(User user) {

		List<MenuCategoryResponseDto> response = new ArrayList<>();
		System.out.println("user : " + user+" "+response);
		List<MenuCategory> menuCategories = menuCategoryRepository.findByUser(user);
		for(MenuCategory menuCategory : menuCategories) {
			List<MenuItemResponseDto> menus = new ArrayList<>();
			List<Menu> menuList = menuRepository.findByMenuCategory(menuCategory);
			for(Menu menu : menuList) {
				MenuItemResponseDto menuItemResponseDto = MenuItemResponseDto.builder()
						.menuId(menu.getMenuId())
						.menuName(menu.getName())
						.description(menu.getDescription())
						.status(menu.getStatus().ordinal())
						.popularity(menu.isPopularity())
						.price(menu.getPrice())
						.build();
				menus.add(menuItemResponseDto);
			}
			MenuCategoryResponseDto menuCategoryResponseDto = MenuCategoryResponseDto.builder()
					.categoryId(menuCategory.getId())
					.categorySequence(menuCategory.getSequence())
					.categoryName(menuCategory.getName())
					.menuItems(menus)
					.build();
			response.add(menuCategoryResponseDto);
		}
		return response;
	}
}
