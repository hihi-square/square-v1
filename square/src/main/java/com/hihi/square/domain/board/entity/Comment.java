package com.hihi.square.domain.board.entity;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.hihi.square.domain.BaseTime;
import com.hihi.square.domain.user.entity.User;

import lombok.Getter;

@Entity
@Getter
@Table(name = "post_comment")
public class Comment extends BaseTime {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "poc_id")
	private Integer id;

	@ManyToOne
	@JoinColumn(name = "usr_id")
	private User user;

	@ManyToOne
	@JoinColumn(name = "re_poc_id")
	private Comment reComment;    //대댓글

	@ManyToOne
	@JoinColumn(name="pos_id")
	private Post post;

	private String comment;
	private Integer depth;

	@Enumerated(EnumType.STRING)
	private Status state;

	@Column(name = "created_at")
	private LocalDateTime createdAt;

	@Column(name = "modified_at")
	private LocalDateTime modifiedAt;
}
