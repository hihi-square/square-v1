package com.hihi.square.domain.board.dto.response;

import java.time.LocalDateTime;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ReCommentListDto {
	private Integer commentId;
	private String comment;
	private LocalDateTime createdAt;
	private LocalDateTime modifiedAt;
	private Integer userId;
	private String userNickname;
	private String userProfile;
}
