package com.hihi.square.domain.menu.dto.request;

import java.util.List;

import javax.validation.constraints.NotEmpty;

import com.hihi.square.domain.menu.entity.Menu;
import com.hihi.square.domain.menu.entity.MenuOption;
import com.hihi.square.domain.menu.entity.MenuOptionCategory;
import com.hihi.square.domain.menu.entity.MenuStatus;
import com.hihi.square.domain.user.entity.User;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class MenuOptionRequestDto {
	private Long id;
	@NotEmpty
	private Long mocId;    //menuOptionCategory id
	private MenuOptionCategory optionCategory;
	private Long menuId;
	private Menu menu;
	private User user;
	@NotEmpty
	private String name;
	private String content;
	private int price;
	private String status;
	private Integer sequence;

	private List<MenuOptionRequestDto> data;

	public MenuOption toEntity() {
		MenuOption menuOption = MenuOption.builder()
			.id(id)
			.optionCategory(optionCategory.builder().id(mocId).build())
			.menu(menu.builder().menuId(menuId).build())
			.user(user)
			.name(name)
			.content(content)
			.price(price)
			.status(MenuStatus.from(status))
			.sequence(sequence)
			.build();
		return menuOption;
	}
}
