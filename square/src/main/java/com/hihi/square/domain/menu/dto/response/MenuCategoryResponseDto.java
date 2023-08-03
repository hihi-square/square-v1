package com.hihi.square.domain.menu.dto.response;

import com.hihi.square.domain.menu.entity.Menu;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
public class MenuCategoryResponseDto {

    private Long categoryId;
    private Integer categorySequence;
    private String categoryName;
    private List<MenuItemResponseDto> menuItems;

}
