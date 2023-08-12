package com.hihi.square.domain.menu.dto.request;

import java.util.List;

import javax.validation.constraints.NotEmpty;

import com.hihi.square.domain.menu.entity.Menu;
import com.hihi.square.domain.menu.entity.MenuCategory;
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
public class MenuRequestDto {
	private Long id;
	// private int userId;
	private User user;
	// private StoreMenuCategory storeMenuCategory;
	@NotEmpty
	private Long categoryId;
	private String categoryName;
	private MenuCategory menuCategory;
	@NotEmpty
	private String name;
	private Integer price;
	private String image;
	private String thumbnail;
	private boolean signature;
	private boolean popularity;
	// private MenuStatus status;
	private String status;
	private String description;
	private Integer salRecord;
	private Integer sequence;

	private List<MenuRequestDto> data;

	public Menu toEntity() {
		Menu menu = Menu.builder()
			.menuId(id)
			// .user(user.builder().usrId(userId).build())
			.user(user)
			// .scm_id(scm_id)    //객체 변환 필요
			.menuCategory(menuCategory.builder().id(categoryId).name(categoryName).build())
			.name(name)
			.price(price)
			.image(image)
			.thumbnail(thumbnail)
			.signature(signature)
			.popularity(popularity)
			.status(MenuStatus.from(status))
			.description(description)
			.salRecord(salRecord)
			.sequence(sequence)
			.build();
		return menu;
	}
}
