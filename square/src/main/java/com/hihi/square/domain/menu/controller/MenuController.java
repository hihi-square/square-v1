package com.hihi.square.domain.menu.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hihi.square.domain.menu.dto.response.CommonResponseDto;
import com.hihi.square.domain.menu.dto.response.MenuResponseDto;
import com.hihi.square.domain.menu.entity.Menu;
import com.hihi.square.domain.menu.service.MenuService;
import com.hihi.square.domain.user.service.UserService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/menu")
@RequiredArgsConstructor
@Slf4j
public class MenuController {

	private final MenuService menuService;
	private final UserService userService;

	@GetMapping
	public ResponseEntity<CommonResponseDto<?>> getAllMenus() {
		List<Menu> menuList = menuService.findAll();
		List<MenuResponseDto> menuResponseDtoList = new ArrayList<>();

		for (Menu menu : menuList) {
			menuResponseDtoList.add(new MenuResponseDto(menu));
		}

		return ResponseEntity.ok(CommonResponseDto.success(menuResponseDtoList));
	}

	@GetMapping("/{id}")
	public ResponseEntity<CommonResponseDto<?>> getMenuById(@PathVariable Long id) {
		Menu menu = menuService.findById(id);
		if (menu != null) {
			return ResponseEntity.ok(CommonResponseDto.success(new MenuResponseDto(menu)));
		} else {
			return ResponseEntity.notFound().build();
		}
	}

	// @PostMapping
	// public ResponseEntity<CommonResponseDto<?>> saveMenu(@RequestBody MenuRequestDto menuRequestDto) {
	// 	menuService.saveMenu(menuRequestDto);
	// 	return ResponseEntity.ok(CommonResponseDto.success(null));
	// }
	//
	// @PatchMapping("/{id}")
	// public ResponseEntity<CommonResponseDto<?>> updateMenu(
	// 	@PathVariable Long id, @RequestBody MenuRequestDto menuRequestDto) {
	// 	log.debug("id ", id);
	// 	log.debug("menuRequestDto ", menuRequestDto);
	// 	menuRequestDto.setId(id);
	// 	menuService.updateMenu(menuRequestDto);
	// 	return ResponseEntity.ok(CommonResponseDto.success(null));
	// }
}
