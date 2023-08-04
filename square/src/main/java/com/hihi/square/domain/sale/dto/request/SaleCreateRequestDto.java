package com.hihi.square.domain.sale.dto.request;

import lombok.Data;
import net.bytebuddy.matcher.FilterableList;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
public class SaleCreateRequestDto {
    private String name; // 타임세일 명
    private LocalDateTime startAt; // 시작 일/시간
    private LocalDateTime finishedAt; // 마지막 일/시간


    private Integer price; // 총 가격 -> 팔 가격
    private List<SaleCreateMenuRequestDto> menus;
}
