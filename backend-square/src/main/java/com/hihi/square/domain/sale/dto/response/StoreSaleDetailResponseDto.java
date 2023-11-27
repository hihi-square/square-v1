package com.hihi.square.domain.sale.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class StoreSaleDetailResponseDto {
    private String message;
    private Integer statusCode;
    private StoreSaleDetailDto sale;
}
