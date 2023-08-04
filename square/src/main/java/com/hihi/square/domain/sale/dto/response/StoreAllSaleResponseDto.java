package com.hihi.square.domain.sale.dto.response;

import lombok.Builder;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
@Builder
public class StoreAllSaleResponseDto {
    private String message;
    private Integer statusCode;
    private List<StoreSaleDto> sales = new ArrayList<>();
}