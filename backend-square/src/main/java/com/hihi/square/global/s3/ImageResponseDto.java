package com.hihi.square.global.s3;


import com.hihi.square.global.s3.dto.FileThumbResponseDto;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class ImageResponseDto {
    private String message;
    private Integer statusCode;
    private List<FileThumbResponseDto> images;
}
