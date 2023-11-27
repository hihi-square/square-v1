package com.hihi.square.domain.store.dto.response;

import com.hihi.square.domain.menu.dto.response.MenuCategoryDto;
import com.hihi.square.domain.sale.dto.response.StoreSaleDto;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class StoreMenuResponseDto {

    private List<StoreSaleDto> sales;
    private List<MenuCategoryDto> menus;
}
