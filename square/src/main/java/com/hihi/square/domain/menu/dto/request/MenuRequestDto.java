package com.hihi.square.domain.menu.dto.request;

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
	@NotEmpty
	private String uid;
	private User user;
	// private StoreMenuCategory storeMenuCategory;
	@NotEmpty
	private Long categoryId;
	private MenuCategory menuCategory;
	@NotEmpty
	private String name;
	private Integer price;
	private String image;
	private boolean signature;
	private boolean popularity;
	private MenuStatus status;
	private String description;
	private Integer salRecord;

	public Menu toEntity() {
		Menu menu = Menu.builder()
			.menuId(id)
			.user(user.builder().uid(uid).build())
			// .scm_id(scm_id)    //객체 변환 필요
			.menuCategory(menuCategory.builder().id(categoryId).build())
			.price(price)
			.image(image)
			.signature(signature)
			.popularity(popularity)
			.status(status)
			.description(description)
			.salRecord(salRecord)
			.build();
		return menu;
	}
}
