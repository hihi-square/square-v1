package com.hihi.square.domain.board.dto.request;

import lombok.Data;

@Data
public class CommentUpdateRequestDto {
	private Integer commentId;
	private String comment;
}
