package com.hihi.square.domain.menu.dto.request;

import com.hihi.square.domain.menu.entity.enums.MenuStatus;

public class MenuRequestDto {
	// @GeneratedValue
	private Long id;
	// private Store sto;
	// private List<StoreMenuCategory> storeMenuCategoryList;
	// private List<MenuCategory> menuCategoryList;
	private int sto_id;
	private int mec_id;
	private int scm_id;
	private String name;
	private Integer price;
	private Integer image;
	private boolean signature;
	private boolean popularity;
	private MenuStatus status;
	private String description;
}
