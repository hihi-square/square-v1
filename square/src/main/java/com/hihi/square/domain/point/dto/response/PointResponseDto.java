package com.hihi.square.domain.point.dto.response;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class PointResponseDto {

    private Integer pointId;
    private String createAt;
    private String storeName;
    private Integer type;
    private Long point;

}
