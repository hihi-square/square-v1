package com.hihi.square.domain.board.dto.response;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.persistence.Column;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import com.hihi.square.domain.board.entity.Board;
import com.hihi.square.domain.board.entity.Comment;
import com.hihi.square.domain.board.entity.Post;
import com.hihi.square.domain.board.entity.PostDibs;
import com.hihi.square.domain.board.entity.PostImage;
import com.hihi.square.domain.board.entity.Status;
import com.hihi.square.domain.user.entity.EmdAddress;
import com.hihi.square.domain.user.entity.User;
import com.hihi.square.global.s3.dto.FileThumbDto;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class PostDetailResponseDto {
	private Integer postId;
	private Integer boardId;
	private String boardName;
	private Integer userId;
	private String userNickname;
	private EmdAddress emdAddress;
	private Integer viewCnt;
	private String title;
	private String content;
	private LocalDateTime createdAt;
	private LocalDateTime modifiedAt;
	private Float latitude;
	private Float longitude;
	@Builder.Default
	private List<FileThumbDto> images = new ArrayList<>();
	private Boolean isLikePost;
	@Builder.Default
	private List<CommentListDto> comments = new ArrayList<>();


}
