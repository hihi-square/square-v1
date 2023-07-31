package com.hihi.square.domain.menu.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hihi.square.domain.menu.entity.Menu;
import com.hihi.square.domain.menu.service.MenuService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequiredArgsConstructor
@RequestMapping("/menu")
@Slf4j
public class MenuController {

	private final MenuService ms;

	@PostMapping
	public ResponseEntity<Menu> saveMenu(@RequestBody CreateMenuRequest request) {
		Menu menu = new Menu();
		menu.setId(request.getId());

		ms.saveMenu(menu);
		return new CreateMenuResponse("Success");
	}

	@PutMapping("/{id}")
	public ResponseEntity<Menu> updateMenu(@PathVariable("id") Long id, @RequestBody UpdateMenuRequest request) {
		ms.update(id, request.getName());
		Menu findMenu = ms.findOne(id);
		return new ResponseEntity<Menu>(, HttpStatus.OK);
	}

	@GetMapping
	public ResponseEntity<> findAll() {
		List<Menu> findMenus = ms.findAll();
		List<MenuDto> collect = findMenus.stream()
			.map(m -> new MenuDto(m.getName()))
			.collect(Collectors.toList());

		return new Result(collect);
	}

}
