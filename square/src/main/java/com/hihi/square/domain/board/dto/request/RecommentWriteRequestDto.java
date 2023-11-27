package com.hihi.square.domain.board.dto.request;

import lombok.Builder;
import lombok.Data;

@Data
public class RecommentWriteRequestDto {

	private Integer commentId;
	private String comment;
}
