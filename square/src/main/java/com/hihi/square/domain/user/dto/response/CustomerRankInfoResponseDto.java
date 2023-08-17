package com.hihi.square.domain.user.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CustomerRankInfoResponseDto {

    private Integer cusId;
    private String name;
    private String rankName;
    private Integer percentage;
    private Integer restOrder;
    private String nextRankName;
    private Integer month;
    private Integer orderCount;
}
