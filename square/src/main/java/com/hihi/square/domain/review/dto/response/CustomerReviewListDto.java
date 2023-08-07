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
public class CustomerReviewListDto {
    private Integer reviewId;
    private Integer orderDetailId;
    private Integer storeId;
    private String storeName;
    private Integer rating;
    private String content;
    private LocalDateTime createdAt;
}
