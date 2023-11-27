package com.hihi.square.domain.board.dto.response;

import com.hihi.square.global.s3.dto.FileThumbDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PostListDto {
	private Integer boardId;
	private Integer postId;
	private String title;
	private String content;
	private LocalDateTime createdAt;
	private FileThumbDto thumbnail; // 첫번째 사진
	private Integer commentCount;
	private Boolean isLike;
	private Integer userId;
	private String userNickname;
	private String userProfile;
	private Double latitude;
	private Double longitude;
	private Integer viewCount;
}
