package com.hihi.square.domain.board.dto.response;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.hihi.square.global.s3.dto.FileThumbDto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class PostUpdateResponseDto {
	private Integer postId;
	private String title;
	private String content;
	@Builder.Default
	private List<FileThumbDto> images = new ArrayList<>();
	private LocalDateTime createdAt;
	private Integer statusCode;
}
