package com.hihi.square.domain.menu.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
@AllArgsConstructor

public class MenuCategoryDto {
    private Long categoryId;
    private Integer categorySequence;
    private String categoryName;
    private List<MenuItemResponseDto> menuItems;
}
