package com.hihi.square.domain.menu.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class RegisteredCategoryresponseDto {

    private Integer scbId;
    private String name;
    private Boolean isRegistered;
}
