package com.hihi.square.domain.board.entity;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
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
@Table(name = "post_dibs")
public class PostDibs {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="pod_id")
	private Integer id;

	@ManyToOne
	@JoinColumn(name = "usr_id")
	private User user;

	@ManyToOne
	@JoinColumn(name = "pos_id")
	private Post post;

	@Column(name = "created_at")
	private LocalDateTime createdAt;
}
