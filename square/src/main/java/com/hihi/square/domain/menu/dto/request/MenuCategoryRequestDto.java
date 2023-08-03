package com.hihi.square.domain.menu.dto.request;

import com.hihi.square.domain.menu.entity.MenuCategory;
import com.hihi.square.domain.user.entity.User;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class MenuCategoryRequestDto {
	private Long id;
	private Integer userId;
	private User user;
	private String name;
	private Integer sequence;

	public MenuCategory toEntity() {
		MenuCategory menuCategory = MenuCategory.builder()
			.id(id)
			.user(user.builder().usrId(userId).build())
			.name(name)
			.sequence(sequence)
			.build();
		return menuCategory;
	}

}
