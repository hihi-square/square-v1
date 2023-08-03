package com.hihi.square.domain.menu.dto.response;

import com.hihi.square.domain.menu.entity.MenuCategory;

import lombok.Data;

@Data
public class MenuCategoryResponseDto {
	private Long id;
	private Integer userId;
	private String name;
	private Integer sequence;

	public MenuCategoryResponseDto(MenuCategory menuCategory) {
		this.id = menuCategory.getId();
		this.userId = menuCategory.getUser().getUsrId();
		this.name = menuCategory.getName();
		this.sequence = menuCategory.getSequence();
	}
}
