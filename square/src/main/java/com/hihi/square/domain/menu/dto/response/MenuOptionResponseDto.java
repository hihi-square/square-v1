package com.hihi.square.domain.menu.dto.response;

import com.hihi.square.domain.menu.entity.MenuOption;

import lombok.Data;

@Data
public class MenuOptionResponseDto {
	private Long id;
	private Long mocId;    //menuOptionCategory id
	private Long menuId;
	private Integer userId;
	private String name;
	private String content;
	private Integer price;
	private String status;
	private Integer sequence;

	public MenuOptionResponseDto(MenuOption menuOption) {
		this.id = menuOption.getId();
		this.mocId = menuOption.getOptionCategory().getId();
		this.menuId = menuOption.getMenu().getMenuId();
		this.userId = menuOption.getUser().getUsrId();
		this.name = menuOption.getName();
		this.content = menuOption.getContent();
		this.price = menuOption.getPrice();
		this.status = menuOption.getStatus().name();
		this.sequence = menuOption.getSequence();
	}
}
