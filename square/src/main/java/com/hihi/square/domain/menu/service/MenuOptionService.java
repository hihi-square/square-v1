package com.hihi.square.domain.menu.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.hihi.square.domain.menu.dto.request.MenuOptionRequestDto;
import com.hihi.square.domain.menu.entity.MenuOption;
import com.hihi.square.domain.menu.repository.MenuOptionRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class MenuOptionService {
	private final MenuOptionRepository menuOptionRepository;

	public void saveMenuOption(MenuOption menuOption) {
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
			Long optionId = request.getId();
			Integer sequence = request.getSequence();
			menuOptionRepository.updateMenuOptionList(optionId, sequence);
		}
	}

	public void deleteMenuOption(MenuOption menuOption) {
		menuOption.updateStatus();
	}

	public List<MenuOption> findAll() {
		List<MenuOption> menuOptionList = menuOptionRepository.findAll();
		return menuOptionList;
	}

	public MenuOption findById(Long menuCategoryId) {
		MenuOption menuOption = menuOptionRepository.findById(menuCategoryId).get();
		return menuOption;
	}

	public List<MenuOption> findAllByUserId(Integer userId) {
		List<MenuOption> menuOptionList = menuOptionRepository.findAllByUserId(userId);
		return menuOptionList;
	}
}
