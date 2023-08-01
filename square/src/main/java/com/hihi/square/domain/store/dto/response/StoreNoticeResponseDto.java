package com.hihi.square.domain.store.dto.response;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.hihi.square.domain.image.dto.response.ImageResponseDto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class StoreNoticeResponseDto {
	private Integer snoId;

	private String content;

	private LocalDateTime createdAt;

	private LocalDateTime modifiedAt;

	private List<ImageResponseDto> images = new ArrayList<>();

}
