package com.hihi.square.domain.image.dto.request;

import javax.validation.constraints.NotEmpty;

import org.springframework.web.multipart.MultipartFile;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class ImageRequestDto {
	// @NotEmpty
	// private Integer order;
	@NotEmpty
	private MultipartFile file;
	@NotEmpty
	private MultipartFile thumbnail;
}
