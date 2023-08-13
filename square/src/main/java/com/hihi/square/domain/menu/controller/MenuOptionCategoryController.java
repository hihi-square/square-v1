package com.hihi.square.domain.menu.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hihi.square.domain.menu.dto.request.MenuOptionCategoryRequestDto;
import com.hihi.square.domain.menu.dto.response.CommonResponseDto;
import com.hihi.square.domain.menu.dto.response.MenuOptionCategoryResponseDto;
import com.hihi.square.domain.menu.entity.MenuOptionCategory;
import com.hihi.square.domain.menu.service.MenuOptionCategoryService;
import com.hihi.square.domain.user.entity.Customer;
import com.hihi.square.domain.user.entity.User;
import com.hihi.square.domain.user.service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/store/optioncategory")
@RequiredArgsConstructor
public class MenuOptionCategoryController {
	private final MenuOptionCategoryService menuOptionCategoryService;
	private final UserService userService;

	@GetMapping
	public ResponseEntity<CommonResponseDto<?>> getAllOptionCategory(@RequestParam("menu") Long menuId) {
		// String uid = authentication.getName();
		// User user = userService.findByUid(uid).get();

		List<MenuOptionCategory> menuOptionCategoryList = menuOptionCategoryService.findAllByMenuId(menuId);
		List<MenuOptionCategoryResponseDto> responseList = new ArrayList<>();

		for (MenuOptionCategory menuOptionCategory : menuOptionCategoryList) {
			responseList.add(new MenuOptionCategoryResponseDto(menuOptionCategory));
		}

		return ResponseEntity.ok(CommonResponseDto.success(responseList));
	}

	@GetMapping("/{id}")
	public ResponseEntity<CommonResponseDto<?>> getMenuOptionCategoryById(@PathVariable Long id) {
		MenuOptionCategory optionCategory = menuOptionCategoryService.findById(id);
		if (optionCategory != null) {
			return ResponseEntity.ok(CommonResponseDto.success(new MenuOptionCategoryResponseDto(optionCategory)));
		} else {
			return ResponseEntity.notFound().build();
		}
	}

	@PostMapping
	public ResponseEntity<CommonResponseDto<?>> saveMenuOptionCategory(
		Authentication authentication, @RequestBody MenuOptionCategoryRequestDto request) {
		String uid = authentication.getName();
		User user = userService.findByUid(uid).get();

		if (user instanceof Customer) {
			return ResponseEntity.ok(CommonResponseDto.error(403, "Only Store Access"));
		}

		MenuOptionCategory menuOptionCategory = request.toEntity();
		menuOptionCategoryService.saveMenuOptionCategory(menuOptionCategory);
		return ResponseEntity.ok(CommonResponseDto.success("success"));
	}

	@PatchMapping("/{id}")
	public ResponseEntity<CommonResponseDto<?>> updateMenuOptionCategory(
		@PathVariable Long id, @RequestBody MenuOptionCategoryRequestDto request) {
		request.setId(id);
		MenuOptionCategory menuOptionCategory = menuOptionCategoryService.updateMenuOptionCategory(request);
		return ResponseEntity.ok(CommonResponseDto.success(new MenuOptionCategoryResponseDto(menuOptionCategory)));
	}

	@PatchMapping("/list")
	public ResponseEntity<CommonResponseDto<?>> updateMenuOptionCategoryList(
		@RequestBody MenuOptionCategoryRequestDto request) {
		List<MenuOptionCategoryRequestDto> optionCategoryList = request.getData();
		menuOptionCategoryService.updateMenuOptionCategoryList(optionCategoryList);
		return ResponseEntity.ok(CommonResponseDto.success("success"));
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<CommonResponseDto<?>> deleteMenuOptionCategory(
		@PathVariable Long id) {
		MenuOptionCategory menuOptionCategory = menuOptionCategoryService.findById(id);
		if (menuOptionCategory == null) {
			return ResponseEntity.badRequest().build();
		}
		menuOptionCategoryService.deleteMenuOptionCategory(menuOptionCategory);
		return ResponseEntity.ok(CommonResponseDto.success(new MenuOptionCategoryResponseDto(menuOptionCategory)));
	}
}
