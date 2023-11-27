package com.hihi.square.domain.review.dto.response;

import com.hihi.square.global.s3.dto.FileThumbDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StoreReviewListDto {
    private Integer reviewId;
    private Integer orderId;
    private Integer userId;
    private String userNickname;
    private Integer rating;
    private String content;
    private LocalDateTime createdAt;
    @Builder.Default
    private List<FileThumbDto> images = new ArrayList<>();
}
