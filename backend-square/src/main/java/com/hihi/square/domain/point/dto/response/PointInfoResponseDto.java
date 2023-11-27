package com.hihi.square.domain.point.dto.response;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class PointInfoResponseDto {

    private Long totalPoint;
    private String name;
    private Integer count;
    private List<PointResponseDto> pointList;
}
