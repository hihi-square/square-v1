package com.hihi.square.menu.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hihi.square.menu.entity.MenuEntity;
import com.hihi.square.menu.service.MenuService;

import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequiredArgsConstructor
@RequestMapping("/menu")
@Slf4j
public class MenuController {

	private final MenuService ms;

	@PostMapping
	public CreateMenuResponse saveMenuV1(@RequestBody MenuEntity menu) {
		log.info("Menu: ", menu);
		System.out.println(menu);
		ms.saveMenu(menu);
		return new CreateMenuResponse("Success");
	}

	@Data
	static class CreateMenuResponse {
		private String message;

		public CreateMenuResponse(String message) {
			this.message = message;
		}
	}

}
