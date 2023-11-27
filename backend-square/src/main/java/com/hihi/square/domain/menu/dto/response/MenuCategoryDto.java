package com.hihi.square.domain.menu.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor

public class MenuCategoryDto {
    private Long categoryId;
    private String categoryName;
    private List<MenuItemResponseDto> menuItems;
}
