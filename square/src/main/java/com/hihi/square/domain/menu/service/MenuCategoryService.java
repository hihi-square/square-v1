// package com.hihi.square.domain.menu.service;
//
// import java.util.Optional;
//
// import org.springframework.stereotype.Service;
//
// import com.hihi.square.domain.menu.entity.Menu;
// import com.hihi.square.domain.menu.entity.MenuCategory;
// import com.hihi.square.domain.menu.repository.MenuCategoryRepository;
//
// import lombok.RequiredArgsConstructor;
//
// @Service
// @RequiredArgsConstructor
// public class MenuCategoryService {
// 	private final MenuCategoryRepository menuCategoryRepository;
//
// 	public void saveMenuCategory(MenuCategory menuCategory) {
// 		menuCategoryRepository.save(menuCategory);
// 	}
//
// 	public Menu updateMenu(MenuCategory menuCategory) {
// 		Optional<Menu> menu = menuRepository.findById(menuRequestDto.getId());
// 		if (!menu.isPresent()) {
// 			return null;
// 		}
// 		Menu saveMenu = menuRequestDto.toEntity();
// 		return menuRepository.save(saveMenu);
// 	}
// }
