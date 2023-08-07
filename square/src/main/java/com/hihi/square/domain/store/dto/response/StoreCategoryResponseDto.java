package com.hihi.square.domain.store.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class StoreCategoryResponseDto {

    private Integer scsId;
    private String categoryName;

}
