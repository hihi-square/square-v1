package com.hihi.square.domain.menu.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.hihi.square.domain.menu.dto.request.MenuCategoryRequestDto;
import com.hihi.square.domain.menu.entity.MenuCategory;
import com.hihi.square.domain.menu.repository.MenuCategoryRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class MenuCategoryService {
	private final MenuCategoryRepository menuCategoryRepository;

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

	public void deleteMenuCategory(MenuCategory menuCategory) {
		menuCategoryRepository.delete(menuCategory);
	}

	public List<MenuCategory> findAll() {
		List<MenuCategory> menuCategoryList = menuCategoryRepository.findAll();
		return menuCategoryList;
	}

	public MenuCategory findById(Long menuCategoryId) {
		MenuCategory menuCategory = menuCategoryRepository.findById(menuCategoryId).get();
		return menuCategory;
	}

}
