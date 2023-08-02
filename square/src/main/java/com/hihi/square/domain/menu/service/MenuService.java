package com.hihi.square.domain.menu.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.hihi.square.domain.menu.dto.request.MenuRequestDto;
import com.hihi.square.domain.menu.entity.Menu;
import com.hihi.square.domain.menu.repository.MenuRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MenuService {

	private final MenuRepository menuRepository;

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

	public void deleteMenu(Menu menu) {
		menu.updateStatus();
	}

	public List<Menu> findAll() {
		List<Menu> menuList = menuRepository.findAll();
		return menuList;
	}

	public Menu findById(Long menuId) {
		Menu menu = menuRepository.findById(menuId).get();
		return menu;
	}

	public boolean validateDuplicateMenuId(Long menuId) {
		Optional<Menu> menu = menuRepository.findById(menuId);
		return menu.isPresent();
	}
}
