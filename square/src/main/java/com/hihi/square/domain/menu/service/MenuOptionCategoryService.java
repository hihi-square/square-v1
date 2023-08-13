package com.hihi.square.domain.menu.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.hihi.square.domain.menu.dto.request.MenuOptionCategoryRequestDto;
import com.hihi.square.domain.menu.entity.MenuOptionCategory;
import com.hihi.square.domain.menu.repository.MenuOptionCategoryRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MenuOptionCategoryService {
	private final MenuOptionCategoryRepository optionCategoryRepository;

	public boolean isExistsCategory(Long menId) {
		Optional<MenuOptionCategory> optionCategory = optionCategoryRepository.findByName(menId,
			"미분류");
		if (optionCategory.isPresent()) {
			return true;
		} else
			return false;
	}

	public void saveMenuOptionCategory(MenuOptionCategory menuOptionCategory) {
		optionCategoryRepository.save(menuOptionCategory);
	}

	public MenuOptionCategory updateMenuOptionCategory(MenuOptionCategoryRequestDto request) {
		Optional<MenuOptionCategory> updateOptionCategory = optionCategoryRepository.findById(request.getId());
		if (!updateOptionCategory.isPresent()) {
			return null;
		}
		MenuOptionCategory saveMenuOptionCategory = request.toEntity();
		return optionCategoryRepository.save(saveMenuOptionCategory);
	}

	public void updateMenuOptionCategoryList(List<MenuOptionCategoryRequestDto> requestList) {
		for (MenuOptionCategoryRequestDto request : requestList) {
			Long categoryId = request.getId();
			Integer sequence = request.getSequence();
			// log.info("categoryId : {}", categoryId);
			// log.info("sequence : {}", sequence);
			optionCategoryRepository.updateMenuOptionCategoryList(categoryId, sequence);
		}
	}

	public void updateOptionCategoryToZero(Long menId, Long mocId) {
		//미분류 번호로 지정
		MenuOptionCategory menuOptionCategory = optionCategoryRepository.findByName(menId, "미분류").get();
		optionCategoryRepository.updateOptionCategoryToZero(mocId, menuOptionCategory.getId());
	}

	public void deleteMenuOptionCategory(MenuOptionCategory menuOptionCategory) {
		optionCategoryRepository.delete(menuOptionCategory);
	}

	public List<MenuOptionCategory> findAllByMenuId(Long menId) {
		List<MenuOptionCategory> menuCategoryList = optionCategoryRepository.findAllByMenuId(menId);
		return menuCategoryList;
	}

	//mocId : 메뉴옵션카테고리ID
	public MenuOptionCategory findById(Long mocId) {
		MenuOptionCategory menuOptionCategory = optionCategoryRepository.findById(mocId).get();
		return menuOptionCategory;
	}

	public List<MenuOptionCategory> findAllByUserId(Integer userId) {
		List<MenuOptionCategory> menuOptionCategoryList = optionCategoryRepository.findAllByUserId(userId);
		return menuOptionCategoryList;
	}

}
