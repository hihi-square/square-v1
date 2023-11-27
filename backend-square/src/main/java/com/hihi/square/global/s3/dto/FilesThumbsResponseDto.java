package com.hihi.square.global.s3.dto;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class FilesThumbsResponseDto {
    private Integer statusCode;
    private List<FileThumbDto> files;

}
