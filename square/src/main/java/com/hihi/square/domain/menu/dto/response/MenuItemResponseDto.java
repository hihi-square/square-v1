package com.hihi.square.domain.menu.dto.response;

import com.hihi.square.domain.menu.entity.MenuStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MenuItemResponseDto {

    private Long menuId;
    private String menuName;
    private String description;
    private MenuStatus status;
    private boolean signature;
    private boolean popularity;
    private Integer price;
    private String menuThumbnail;
    private String menuImage;

}
