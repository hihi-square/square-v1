package com.hihi.square.global.s3.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class FileThumbResponseDto {
	private Integer statusCode;
	private FileThumbDto file;
}
