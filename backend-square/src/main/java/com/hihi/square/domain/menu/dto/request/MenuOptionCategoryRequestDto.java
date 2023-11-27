package com.hihi.square.domain.menu.dto.request;

import java.util.List;

import javax.validation.constraints.NotEmpty;

import com.hihi.square.domain.menu.entity.Menu;
import com.hihi.square.domain.menu.entity.MenuOptionCategory;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MenuOptionCategoryRequestDto {
	private Long id;
	@NotEmpty
	private Long menId;
	private Menu menu;
	@NotEmpty
	private String name;
	private Integer sequence;

	private List<MenuOptionCategoryRequestDto> data;

	public MenuOptionCategory toEntity() {
		MenuOptionCategory menuOptionCategory = MenuOptionCategory.builder()
			.id(id)
			.menu(menu.builder().menuId(menId).build())
			.name(name)
			.sequence(sequence)
			.build();
		return menuOptionCategory;
	}
}
