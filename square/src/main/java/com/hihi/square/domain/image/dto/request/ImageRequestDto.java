package com.hihi.square.domain.image.dto.request;

import javax.validation.constraints.NotEmpty;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ImageRequestDto {
	@NotEmpty
	private String url;
	@NotEmpty
	private Integer order;
	@NotEmpty
	private String thumbnail;
}
