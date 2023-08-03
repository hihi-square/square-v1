package com.hihi.square.domain.image.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ImageFileThumbDto {
	private String url;
	private String thumbnail;
}
