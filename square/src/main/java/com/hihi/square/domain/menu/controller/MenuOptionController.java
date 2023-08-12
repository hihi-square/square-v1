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

import com.hihi.square.domain.menu.dto.request.MenuOptionRequestDto;
import com.hihi.square.domain.menu.dto.response.CommonResponseDto;
import com.hihi.square.domain.menu.dto.response.MenuOptionResponseDto;
import com.hihi.square.domain.menu.entity.MenuOption;
import com.hihi.square.domain.menu.service.MenuOptionService;
import com.hihi.square.domain.user.entity.User;
import com.hihi.square.domain.user.service.UserService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/store/menuoption")
@RequiredArgsConstructor
@Slf4j
public class MenuOptionController {
	private final MenuOptionService menuOptionService;
	private final UserService userService;

	@GetMapping("/all")
	public ResponseEntity<CommonResponseDto<?>> getAllOption(Authentication authentication) {
		String uid = authentication.getName();
		User user = userService.findByUid(uid).get();
		//
		List<MenuOption> menuOptionList = menuOptionService.findAllByUserId(user.getUsrId());
		// List<MenuOption> menuOptionList = menuOptionService.findAllByUserId(userId);
		List<MenuOptionResponseDto> responseList = new ArrayList<>();
		log.info("optionList:{}", menuOptionList);
		for (MenuOption menuOption : menuOptionList) {
			responseList.add(new MenuOptionResponseDto(menuOption));
		}
		log.info("optionList : {}", menuOptionList);
		return ResponseEntity.ok(CommonResponseDto.success(responseList));
	}

	@GetMapping
	public ResponseEntity<CommonResponseDto<?>> getAllOptionById(Authentication authentication,
		@RequestParam("menu") Long menuId) {
		String uid = authentication.getName();
		User user = userService.findByUid(uid).get();
		// List<MenuOption> menuOptionList = menuOptionService.findAllByUserId(user.getUsrId());
		log.info("menuId : {}", menuId);
		List<MenuOption> menuOptionList = menuOptionService.findAllById(user.getUsrId(), menuId);

		log.info("optionList : {}", menuOptionList);
		List<MenuOptionResponseDto> responseList = new ArrayList<>();

		for (MenuOption menuOption : menuOptionList) {
			responseList.add(new MenuOptionResponseDto(menuOption));
		}
		log.info("optionList : {}", menuOptionList);
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
	public ResponseEntity<CommonResponseDto<?>> saveMenuOption(Authentication authentication,
		@RequestBody MenuOptionRequestDto request) {
		String uid = authentication.getName();
		User user = userService.findByUid(uid).get();
		request.setUser(user);

		MenuOption menuOption = request.toEntity();
		menuOptionService.saveMenuOption(menuOption);
		return ResponseEntity.ok(CommonResponseDto.success(null));
	}

	@PatchMapping("/{id}")
	public ResponseEntity<CommonResponseDto<?>> updateMenuOption(
		Authentication authentication, @PathVariable Long id, @RequestBody MenuOptionRequestDto request) {
		String uid = authentication.getName();
		User user = userService.findByUid(uid).get();

		request.setId(id);
		request.setUser(user);
		MenuOption menuOption = menuOptionService.updateMenuOption(request);
		return ResponseEntity.ok(CommonResponseDto.success(new MenuOptionResponseDto(menuOption)));
	}

	@PatchMapping("/list")
	public ResponseEntity<CommonResponseDto<?>> updateMenuOptionList(Authentication authentication,
		@RequestBody MenuOptionRequestDto request) {
		String uid = authentication.getName();
		User user = userService.findByUid(uid).get();

		List<MenuOptionRequestDto> menuOptionList = request.getData();
		log.info("optionList : {}", menuOptionList);
		menuOptionService.updateMenuOptionList(user, menuOptionList);
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
