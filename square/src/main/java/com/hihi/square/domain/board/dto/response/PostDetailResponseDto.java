package com.hihi.square.domain.board.dto.response;

import com.hihi.square.domain.user.entity.EmdAddress;
import com.hihi.square.global.s3.dto.FileThumbDto;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Builder
@Data
public class PostDetailResponseDto {
	private Integer postId;
	private Integer boardId;
	private String boardName;
	private Integer userId;
	private String userNickname;
	private String userProfile;
	private EmdAddress emdAddress;
	private Integer viewCnt;
	private String title;
	private String content;
	private LocalDateTime createdAt;
	private LocalDateTime modifiedAt;
	private Double latitude;
	private Double longitude;
	@Builder.Default
	private List<FileThumbDto> images = new ArrayList<>();
	private Boolean isLikePost;
	@Builder.Default
	private List<CommentListDto> comments = new ArrayList<>();
	private Integer commentCnt;


}
