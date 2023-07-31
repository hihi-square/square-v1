package com.hihi.square.domain.board.entity;

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
public class Review extends BaseTime {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "poc_id")
	private Integer id;

	@ManyToOne
	@JoinColumn(name = "user_id", referencedColumnName = "usrId")
	private User user;

	@ManyToOne
	@JoinColumn(name = "re_user_id", referencedColumnName = "usrId")
	private User reUser;    //대댓글

	private String comment;
	private Integer depth;
	
	@Enumerated(EnumType.STRING)
	private Status status;
}
