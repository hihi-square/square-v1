package com.hihi.square.domain.sale.dto.response;

import com.hihi.square.domain.menu.entity.MenuStatus;
import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class SaleMenuDto {
    private Long menuId;
    private String name;
    private Integer price;
    private boolean signature;
    private boolean popularity;
    private MenuStatus status;
    private String description;
    private Integer sequence;
    private Integer quantity;
}
