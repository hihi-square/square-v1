package com.hihi.square.domain.review.dto.request;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ReviewUpdateRequestDto {
    private Integer reviewId;
    private Integer rating;
    private String content;
}
