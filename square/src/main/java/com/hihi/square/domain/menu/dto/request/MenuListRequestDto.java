package com.hihi.square.domain.menu.dto.request;

import java.util.List;

import com.hihi.square.domain.menu.entity.Menu;
import com.hihi.square.domain.menu.entity.MenuStatus;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class MenuListRequestDto {
	private Long menuId;
	private MenuStatus status;
	private Integer sequence;

	private List<Menu> data;

}
