package com.hihi.square.domain.sale.dto.response;

import com.hihi.square.domain.board.entity.Status;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class StoreSaleDto {
    private Integer id;
    private String name;
    private LocalDateTime startedAt;
    private LocalDateTime finishedAt;
    private LocalDateTime realFinishedAt;
    private Integer price;
    private Status status;
    private Integer menuNumber; // 물품 수
}
