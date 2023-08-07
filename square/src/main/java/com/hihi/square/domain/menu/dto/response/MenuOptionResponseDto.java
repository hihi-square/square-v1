package com.hihi.square.domain.menu.dto.response;

import com.hihi.square.domain.menu.entity.MenuOption;

import lombok.Data;

@Data
public class MenuOptionResponseDto {
	private Long id;
	private Long moId;    //menuOptionCategory id
	private Long menuId;
	private Integer userId;
	private String name;
	private String content;
	private int price;
	private String status;

	public MenuOptionResponseDto(MenuOption menuOption) {
		this.id = menuOption.getId();
		this.moId = menuOption.getOptionCategory().getId();
		this.menuId = menuOption.getMenu().getMenuId();
		this.userId = menuOption.getUser().getUsrId();
		this.name = menuOption.getName();
		this.content = menuOption.getName();
		this.price = menuOption.getPrice();
		this.status = menuOption.getStatus().toString();
	}
}
