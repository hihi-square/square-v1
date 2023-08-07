package com.hihi.square.domain.menu.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.hihi.square.domain.menu.dto.request.MenuRequestDto;
import com.hihi.square.domain.menu.entity.Menu;
import com.hihi.square.domain.menu.entity.MenuCategory;
import com.hihi.square.domain.menu.entity.MenuStatus;
import com.hihi.square.domain.menu.repository.MenuCategoryRepository;
import com.hihi.square.domain.menu.repository.MenuRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class MenuService {

	private final MenuRepository menuRepository;
	private final MenuCategoryRepository menuCategoryRepository;

	public void saveMenu(MenuRequestDto menuRequestDto) {
		Menu menu = menuRequestDto.toEntity();
		menuRepository.save(menu);
	}

	public Menu updateMenu(MenuRequestDto menuRequestDto) {
		Optional<Menu> menu = menuRepository.findById(menuRequestDto.getId());
		if (!menu.isPresent()) {
			return null;
		}
		Menu saveMenu = menuRequestDto.toEntity();
		return menuRepository.save(saveMenu);
	}

	public void updateMenuList(List<MenuRequestDto> menuRequestList) {
		for (MenuRequestDto menuRequestDto : menuRequestList) {
			Long menuId = menuRequestDto.getId();
			Integer usrId = menuRequestDto.getUserId();
			Long categoryId = menuRequestDto.getCategoryId();
			String menuStatus = menuRequestDto.getStatus();
			Integer sequence = menuRequestDto.getSequence();
			menuRepository.updateMenuList(menuId, categoryId, menuStatus, sequence);
		}
	}

	public void deleteMenu(Menu menu) {
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

}
