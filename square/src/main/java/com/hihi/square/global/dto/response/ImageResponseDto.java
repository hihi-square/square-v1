package com.hihi.square.global.dto.response;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ImageResponseDto {
	private Integer imgId;
	private String url;
	private Integer order;
	private String type;
	private Integer connectedId;
	private String thumbnail;
}
