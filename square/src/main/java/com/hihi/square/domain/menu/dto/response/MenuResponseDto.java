package com.hihi.square.domain.menu.dto.response;

import java.time.LocalDateTime;

import com.hihi.square.domain.menu.entity.Menu;
import com.hihi.square.domain.menu.entity.MenuStatus;

import lombok.Data;

@Data
public class MenuResponseDto {
	private Long id;
	private String image;
	private String thumbnail;
	private Long categoryId;
	private String categoryName;
	private String name;
	private boolean signature;
	private boolean popular;
	private Integer price;
	private MenuStatus status;
	private LocalDateTime createdAt;
	private LocalDateTime modifiedAt;
	private Integer salRecord;
	private String description;
	private Integer order;

	public MenuResponseDto(Menu menu) {
		this.id = menu.getMenuId();
		this.image = menu.getImage();
		this.thumbnail = menu.getThumbnail();
		this.categoryId = menu.getMenuCategory().getId();
		this.categoryName = menu.getMenuCategory().getName();
		this.name = menu.getName();
		this.signature = menu.isSignature();
		this.popular = menu.isPopularity();
		this.price = menu.getPrice();
		this.status = menu.getStatus();
		this.createdAt = menu.getCreatedAt();
		this.modifiedAt = menu.getModifiedAt();
		this.salRecord = menu.getSalRecord();
		this.description = menu.getDescription();
		this.order = menu.getOrder();
	}

	//
	// public MenuResponseDto toDto(Menu menu) {
	// 	MenuResponseDto menuResponseDto = MenuResponseDto.builder()
	// 		.id(menu.getMenuId())
	// 		.image(menu.getImage())
	// 		.thumbnail(menu.getThumbnail())
	// 		.categoryId(menu.getMenuCategory().getId())
	// 		.categoryName(menu.getMenuCategory().getName())
	// 		.name(menu.getName())
	// 		.signature(menu.isSignature())
	// 		.popular(menu.isPopularity())
	// 		.price(menu.getPrice())
	// 		.status(menu.getStatus())
	// 		.createdAt(menu.getCreatedAt())
	// 		.modifiedAt(menu.getModifiedAt())
	// 		.salRecord(menu.getSalRecord())
	// 		.description(menu.getDescription())
	// 		.order(menu.getOrder())
	// 		.build();
	// 	return menuResponseDto;
	// }
}
