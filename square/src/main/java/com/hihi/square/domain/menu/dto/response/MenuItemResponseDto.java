package com.hihi.square.domain.menu.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class MenuItemResponseDto {

    private Long menuId;
    private String menuName;
    private String description;
    private Integer status;
    private boolean popularity;
    private Integer price;
//    private String menuThumbnail;
//    private String menuImage;

}
