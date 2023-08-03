package com.hihi.square.domain.menu.service;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.hihi.square.domain.menu.entity.MenuCategory;
import com.hihi.square.domain.menu.repository.MenuCategoryRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MenuCategoryService {
	private final MenuCategoryRepository menuCategoryRepository;

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
}
