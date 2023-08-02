package com.hihi.square.domain.menu.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.hihi.square.domain.menu.dto.request.MenuRequestDto;
import com.hihi.square.domain.menu.entity.Menu;
import com.hihi.square.domain.menu.entity.MenuCategory;
import com.hihi.square.domain.menu.repository.MenuCategoryRepository;
import com.hihi.square.domain.menu.repository.MenuRepository;
import com.hihi.square.domain.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MenuService {

	private final MenuRepository menuRepository;
	private final MenuCategoryRepository menuCategoryRepository;
	private final UserRepository userRepository;

	public void saveMenu(MenuRequestDto menuRequestDto) {
		// Menu menu = menuRequestDto.toEntity();
		// String userId = menu.getUser().getUid();
		// User user = userRepository.findByUid(userId).get();
		// menuRequestDto.setUser(user);
		//
		// MenuCategory menuCategory = menuCategoryRepository.findById(categoryId).get();
		// menuRequestDto.setMenuCategory(menuCategory);

		Menu saveMenu = menuRequestDto.toEntity();
		menuRepository.save(saveMenu);
	}

	public void updateMenu(MenuRequestDto menuRequestDto) {
		Optional<Menu> menu = menuRepository.findById(menuRequestDto.getId());
		if (menu.isPresent()) {
			MenuCategory menuCategory = menuCategoryRepository.findById(menuRequestDto.getMenuCategory().getId())
				.orElse(null);
			if (menuCategory == null) {
				// 메뉴 카테고리가 존재하지 않을 경우 예외 처리 또는 리턴 값 설정
				return;
			}
			saveMenu(menuRequestDto);
		}
	}

	public List<Menu> findAll() {
		List<Menu> menuList = menuRepository.findAll();
		return menuList;
	}

	public Menu findById(Long menuId) {
		Menu menu = menuRepository.findById(menuId).get();
		return menu;
	}
}
