package com.hihi.square.global.s3.dto;

import lombok.Builder;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
@Builder
public class FilesResponseDto {
    private Integer statusCode;
    @Builder.Default
    List<String> urls = new ArrayList<>();
}
