package com.hihi.square.domain.review.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StoreReviewListDto {
    private Integer reviewId;
    private Integer orderDetailId;
    private Integer userId;
    private String userNickname;
    private Integer rating;
    private String content;
    private LocalDateTime createdAt;
}
