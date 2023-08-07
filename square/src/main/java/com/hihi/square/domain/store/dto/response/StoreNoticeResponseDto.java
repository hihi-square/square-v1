package com.hihi.square.domain.store.dto.response;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.hihi.square.domain.image.dto.response.ImagesDetailResponseDto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class StoreNoticeResponseDto {
	private Integer snoId;

	private String content;

	private String state;

	private LocalDateTime createdAt;

	private LocalDateTime modifiedAt;

	private List<ImagesDetailResponseDto> images = new ArrayList<>();

}
