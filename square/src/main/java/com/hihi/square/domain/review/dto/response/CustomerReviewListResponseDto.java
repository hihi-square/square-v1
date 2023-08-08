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
public class CustomerReviewListResponseDto {
    @Builder.Default
    private List<CustomerReviewListDto> reviews = new ArrayList<>();
    private Integer statusCode;
}
