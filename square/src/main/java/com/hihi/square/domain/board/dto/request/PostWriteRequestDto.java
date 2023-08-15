package com.hihi.square.domain.board.dto.request;

import java.util.ArrayList;
import java.util.List;


import com.hihi.square.global.s3.dto.FileThumbDto;

import lombok.Data;

@Data
public class PostWriteRequestDto {
	private Integer boardId;
	private Long bCode;
	private String title;
	private String content;
	private List<FileThumbDto> images = new ArrayList<>();
	private Float latitude;
	private Float longitude;
}
