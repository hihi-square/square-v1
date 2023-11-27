package com.hihi.square.domain.menu.dto.response;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class CartStoreResponseDto {
    private Integer storeId;
    private String storeName;
    private String storeAddress;
    private List<MenuItemResponseDto> menuItems;
}
