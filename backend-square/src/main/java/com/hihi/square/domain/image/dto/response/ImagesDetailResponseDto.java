package com.hihi.square.domain.image.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ImagesDetailResponseDto {
	private Integer imgId;
	private String url;
	private Integer order;
	private String type;
	private Integer connectedId;
	private String thumbnail;
}
