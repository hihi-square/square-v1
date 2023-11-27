package com.hihi.square.domain.review.dto.request;

import com.hihi.square.global.s3.dto.FileThumbDto;
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
public class ReviewWriteRequestDto {
    private Integer orderId;
    private Integer rating;
    private String content;
    @Builder.Default
    private List<FileThumbDto> images = new ArrayList<>();
}
