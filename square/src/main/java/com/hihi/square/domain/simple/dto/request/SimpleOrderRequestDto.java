package com.hihi.square.domain.simple.dto.request;

import com.hihi.square.domain.menu.entity.Menu;
import com.hihi.square.domain.simple.entity.Simple;
import lombok.Data;

import javax.validation.constraints.NotEmpty;

@Data
public class SimpleOrderRequestDto {

    @NotEmpty
    private Integer menuId;
    private Integer quatinty;
    private Integer price;
    private String request;
    private Integer usePoint;

}
