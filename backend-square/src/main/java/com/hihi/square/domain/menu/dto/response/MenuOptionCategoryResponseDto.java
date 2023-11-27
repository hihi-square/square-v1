package com.hihi.square.domain.menu.dto.response;

import com.hihi.square.domain.menu.entity.MenuOptionCategory;

import lombok.Data;

@Data
public class MenuOptionCategoryResponseDto {
	private Long id;
	private Long menId;
	private String name;
	private Integer sequence;

	public MenuOptionCategoryResponseDto(MenuOptionCategory menuOptionCategory) {
		this.id = menuOptionCategory.getId();
		this.menId = menuOptionCategory.getMenu().getMenuId();
		this.name = menuOptionCategory.getName();
		this.sequence = menuOptionCategory.getSequence();
	}
}
