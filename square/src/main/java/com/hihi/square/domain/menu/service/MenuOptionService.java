package com.hihi.square.domain.menu.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.hihi.square.domain.menu.dto.request.MenuOptionRequestDto;
import com.hihi.square.domain.menu.entity.MenuOption;
import com.hihi.square.domain.menu.entity.MenuStatus;
import com.hihi.square.domain.menu.repository.MenuOptionRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class MenuOptionService {
	private final MenuOptionRepository menuOptionRepository;

	public void saveMenuOption(MenuOption menuOption) {
		menuOption.setDefaultValues();
		menuOptionRepository.save(menuOption);
	}

	public MenuOption updateMenuOption(MenuOptionRequestDto request) {
		Optional<MenuOption> updateOption = menuOptionRepository.findById(request.getId());
		if (!updateOption.isPresent()) {
			return null;
		}
		MenuOption saveMenuOption = request.toEntity();
		return menuOptionRepository.save(saveMenuOption);
	}

	public void updateMenuOptionList(List<MenuOptionRequestDto> requestList) {
		for (MenuOptionRequestDto request : requestList) {
			Long meoId = request.getId();
			Long mocId = request.getMocId();
			String status = request.getStatus();
			Integer sequence = request.getSequence();
			menuOptionRepository.updateMenuOptionList(meoId, mocId, status, sequence);
		}
	}

	public void deleteMenuOption(MenuOption menuOption) {
		menuOptionRepository.updateStatus(menuOption.getId(), MenuStatus.OFF.name());
	}

	public List<MenuOption> findAll() {
		List<MenuOption> menuOptionList = menuOptionRepository.findAll();
		return menuOptionList;
	}

	public MenuOption findById(Long menuOptionId) {
		MenuOption menuOption = menuOptionRepository.findById(menuOptionId).get();
		return menuOption;
	}

	public List<MenuOption> findAllById(Integer userId, Long menuId) {
		List<MenuOption> menuOptionList = menuOptionRepository.findAllById(userId, menuId);
		return menuOptionList;
	}

	public List<MenuOption> findAllByUserId(Integer userId) {
		List<MenuOption> menuOptionList = menuOptionRepository.findAllByUserId(userId);
		return menuOptionList;
	}
}
