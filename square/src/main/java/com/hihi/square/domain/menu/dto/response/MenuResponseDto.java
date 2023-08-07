package com.hihi.square.domain.menu.dto.response;

import java.time.LocalDateTime;

import com.hihi.square.domain.menu.entity.Menu;

import lombok.Data;

@Data
public class MenuResponseDto {
	private Long id;
	private Integer userId;
	private String image;
	private String thumbnail;
	private Long categoryId;
	private String categoryName;
	private String name;
	private boolean signature;
	private boolean popular;
	private Integer price;
	private String status;
	private LocalDateTime createdAt;
	private LocalDateTime modifiedAt;
	private Integer salRecord;
	private String description;
	private Integer sequence;

	public MenuResponseDto(Menu menu) {
		this.id = menu.getMenuId();
		this.userId = menu.getUser().getUsrId();
		this.image = menu.getImage();
		this.thumbnail = menu.getThumbnail();
		this.categoryId = menu.getMenuCategory().getId();
		this.categoryName = menu.getMenuCategory().getName();
		this.name = menu.getName();
		this.signature = menu.isSignature();
		this.popular = menu.isPopularity();
		this.price = menu.getPrice();
		this.status = menu.getStatus().name();
		this.createdAt = menu.getCreatedAt();
		this.modifiedAt = menu.getModifiedAt();
		this.salRecord = menu.getSalRecord();
		this.description = menu.getDescription();
		this.sequence = menu.getSequence();
	}
}
