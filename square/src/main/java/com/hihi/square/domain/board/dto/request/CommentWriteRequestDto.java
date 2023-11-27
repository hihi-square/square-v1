package com.hihi.square.domain.board.dto.request;

import lombok.Data;

@Data
public class CommentWriteRequestDto {

	private Integer postId;
	private String comment;

}
