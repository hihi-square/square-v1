package com.hihi.square.domain.board.dto.response;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import net.bytebuddy.matcher.FilterableList;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CommentListDto {

	private String comment;
	private LocalDateTime createdAt;
	private LocalDateTime modifiedAt;
	private Integer userId;
	private String userNickname;
	private Boolean isDeleted;
	private List<ReCommentListDto> recommentList = new ArrayList<>();

}
