package com.hihi.square.domain.review.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StoreReviewListResponseDto {

    @Builder.Default
    private List<StoreReviewListDto> reviews = new ArrayList<>();
    private Float averageRating;
    private Integer[] reviewRateCount;
    private Integer statusCode;
}
