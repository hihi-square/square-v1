package com.hihi.square.domain.board.entity;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.hihi.square.domain.BaseTime;
import com.hihi.square.domain.board.dto.request.PostUpdateRequestDto;
import com.hihi.square.domain.user.entity.EmdAddress;
import com.hihi.square.domain.user.entity.User;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "post")
public class Post extends BaseTime {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "pos_id")
	private Integer id;

	@ManyToOne
	@JoinColumn(name = "pob_id")
	private Board board;

	@ManyToOne
	@JoinColumn(name = "usr_id")
	private User user;

	@ManyToOne
	@JoinColumn(name = "aem_id")
	private EmdAddress emdAddress;

	@Column(name = "view_cnt")
	private Integer viewCnt;
	private String title;
	private String content;

	@Enumerated(EnumType.STRING)
	private Status status;

	@Column(name = "create_at")
	private LocalDateTime createdAt;

	@Column(name = "modieified_at")
	private LocalDateTime modifiedAt;

	@OneToMany(mappedBy = "post")
	@Builder.Default
	private List<PostImage> postImageList = new ArrayList<>();

	@OneToMany(mappedBy = "post")
	@Builder.Default
	private List<Comment> commentList = new ArrayList<>();

	private Float latitude;
	private Float longitude;

	public void updatePost(PostUpdateRequestDto request) {
		this.title = request.getTitle();
		this.content = request.getContent();
		this.modifiedAt = LocalDateTime.now();
	}
}
