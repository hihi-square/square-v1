package com.hihi.square.domain.menu.dto.request;

import java.util.List;

import javax.validation.constraints.NotEmpty;

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
	@NotEmpty
	private Long id;
	@NotEmpty
	private Integer userId;
	private User user;
	private String name;
	@NotEmpty
	private Integer sequence;

	private List<MenuCategoryRequestDto> data;

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
