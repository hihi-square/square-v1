package com.hihi.square.domain.menu.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hihi.square.domain.menu.dto.request.MenuOptionRequestDto;
import com.hihi.square.domain.menu.dto.response.CommonResponseDto;
import com.hihi.square.domain.menu.dto.response.MenuOptionResponseDto;
import com.hihi.square.domain.menu.entity.MenuOption;
import com.hihi.square.domain.menu.service.MenuOptionService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/store/menuoption")
@RequiredArgsConstructor
public class MenuOptionController {
	private final MenuOptionService menuOptionService;
	// private final UserService userService;

	@GetMapping
	public ResponseEntity<CommonResponseDto<?>> getAllOption(@RequestHeader Integer userId) {
		// String uid = authentication.getName();
		// User user = userService.findByUid(uid).get();
		//
		// List<MenuCategory> menuCategoryList = menuCategoryService.findAllByUserId(user.getUsrId());
		List<MenuOption> menuOptionList = menuOptionService.findAllByUserId(userId);
		List<MenuOptionResponseDto> responseList = new ArrayList<>();

		for (MenuOption menuOption : menuOptionList) {
			responseList.add(new MenuOptionResponseDto(menuOption));
		}

		return ResponseEntity.ok(CommonResponseDto.success(responseList));
	}

	@GetMapping("/{id}")
	public ResponseEntity<CommonResponseDto<?>> getMenuOptionById(@PathVariable Long id) {
		MenuOption menuOption = menuOptionService.findById(id);
		if (menuOption != null) {
			return ResponseEntity.ok(CommonResponseDto.success(new MenuOptionResponseDto(menuOption)));
		} else {
			return ResponseEntity.notFound().build();
		}
	}

	@PostMapping
	public ResponseEntity<CommonResponseDto<?>> saveMenuOption(@RequestBody MenuOptionRequestDto request) {
		MenuOption menuOption = request.toEntity();
		menuOptionService.saveMenuOption(menuOption);
		return ResponseEntity.ok(CommonResponseDto.success(null));
	}

	@PatchMapping("/{id}")
	public ResponseEntity<CommonResponseDto<?>> updateMenuOption(
		@PathVariable Long id, @RequestBody MenuOptionRequestDto request) {
		request.setId(id);
		MenuOption menuOption = menuOptionService.updateMenuOption(request);
		return ResponseEntity.ok(CommonResponseDto.success(new MenuOptionResponseDto(menuOption)));
	}

	@PatchMapping("/list")
	public ResponseEntity<CommonResponseDto<?>> updateMenuList(@RequestBody MenuOptionRequestDto request) {
		List<MenuOptionRequestDto> menuOptionList = request.getData();
		// List<Menu> menuList = new ArrayList<>();
		menuOptionService.updateMenuOptionList(menuOptionList);
		return ResponseEntity.ok(CommonResponseDto.success(null));
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<CommonResponseDto<?>> deleteMenuOption(
		@PathVariable Long id) {
		MenuOption menuOption = menuOptionService.findById(id);
		if (menuOption == null) {
			return ResponseEntity.badRequest().build();
		}
		menuOptionService.deleteMenuOption(menuOption);
		return ResponseEntity.ok(CommonResponseDto.success(new MenuOptionResponseDto(menuOption)));
	}
}
