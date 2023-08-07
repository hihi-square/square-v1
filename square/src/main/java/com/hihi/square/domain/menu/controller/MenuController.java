package com.hihi.square.domain.menu.controller;

import java.util.ArrayList;
import java.util.List;

import com.hihi.square.domain.menu.dto.response.CartStoreResponseDto;
import org.springframework.http.HttpStatus;
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

import com.hihi.square.domain.menu.dto.request.MenuRequestDto;
import com.hihi.square.domain.menu.dto.response.CommonResponseDto;
import com.hihi.square.domain.menu.dto.response.MenuResponseDto;
import com.hihi.square.domain.menu.entity.Menu;
import com.hihi.square.domain.menu.service.MenuCategoryService;
import com.hihi.square.domain.menu.service.MenuService;
import com.hihi.square.domain.user.service.UserService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/store/menuitem")
@RequiredArgsConstructor
@Slf4j
public class MenuController {

	private final MenuService menuService;
	private final MenuCategoryService menuCategoryService;
	private final UserService userService;

	@GetMapping
	public ResponseEntity<CommonResponseDto<?>> getAllMenus(@RequestHeader Integer userId) {
		// String uid = authentication.getName();
		// User user = userService.findByUid(uid).get();
		//
		// List<Menu> menuList = menuService.findAllByUserId(user.getUsrId());
		List<Menu> menuList = menuService.findAllByUserId(userId);
		List<MenuResponseDto> menuResponseDtoList = new ArrayList<>();

		for (Menu menu : menuList) {
			menuResponseDtoList.add(new MenuResponseDto(menu));
		}

		return ResponseEntity.ok(CommonResponseDto.success(menuResponseDtoList));
	}

	@GetMapping("/{id}")
	public ResponseEntity<CommonResponseDto<?>> getMenuById(@PathVariable Long id) {
		Menu menu = menuService.findById(id);
		log.info("status : {}", menu.getStatus());
		if (menu != null) {
			return ResponseEntity.ok(CommonResponseDto.success(new MenuResponseDto(menu)));
		} else {
			return ResponseEntity.notFound().build();
		}
	}

	@PostMapping
	public ResponseEntity<CommonResponseDto<?>> saveMenu(@RequestBody MenuRequestDto menuRequestDto) {
		// log.debug("menu ", menuRequestDto);
		// MenuCategory menuCategory = MenuCategory.builder()
		// 	.user(menu.getUser())
		// 	.name(menuRequestDto.getCategoryName())
		// 	.build();
		// 메뉴 카테고리 유무 검사
		if (!menuService.validateDuplicateCategoryId(menuRequestDto.getCategoryId())) {
			return ResponseEntity.ok(CommonResponseDto.error(400, "Dose not Exist CategoryID"));
			// menuCategoryService.saveMenuCategory(menuCategory);
		}
		Menu menu = menuRequestDto.toEntity();

		menuService.saveMenu(menuRequestDto);
		return ResponseEntity.ok(CommonResponseDto.success("success"));
	}

	@PatchMapping("/{id}")
	public ResponseEntity<CommonResponseDto<?>> updateMenu(
		@PathVariable Long id, @RequestBody MenuRequestDto menuRequestDto) {
		menuRequestDto.setId(id);
		Menu menu = menuService.updateMenu(menuRequestDto);
		return ResponseEntity.ok(CommonResponseDto.success(new MenuResponseDto(menu)));
	}

	@PatchMapping("/list")
	public ResponseEntity<CommonResponseDto<?>> updateMenuList(@RequestBody MenuRequestDto menuRequestDto) {
		List<MenuRequestDto> menuRequestDtos = menuRequestDto.getData();
		// List<Menu> menuList = new ArrayList<>();
		menuService.updateMenuList(menuRequestDtos);
		return ResponseEntity.ok(CommonResponseDto.success(null));
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<CommonResponseDto<?>> deleteMenu(
		@PathVariable Long id) {
		Menu menu = menuService.findById(id);
		if (menu == null) {
			return ResponseEntity.badRequest().build();
		}
		menuService.deleteMenu(menu);
		log.debug("menu : {}", menu);
		// return ResponseEntity.ok(CommonResponseDto.success(new MenuResponseDto(menu)));
		return ResponseEntity.ok(CommonResponseDto.success("success"));
	}

	// 장바구니에서 물품 목록을 넘겨주면 ex) store/menuitem/items=1,2,3
	// 가게 별로 정렬후에, response 객체로 정렬해서 넘겨주기
	@GetMapping("/items={itemIds}")
	public ResponseEntity<?> getMenuItemsById(@PathVariable List<Integer> itemIds) {
		List<CartStoreResponseDto> cartInfo = menuService.getMenuItemsById(itemIds);
		return new ResponseEntity<> (cartInfo, HttpStatus.OK);
	}

}
