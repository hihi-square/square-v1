package com.hihi.square.domain.board.entity;

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
public class Dibs extends BaseTime {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@ManyToOne
	@JoinColumn(name = "user_id", referencedColumnName = "usrId")
	private User user;

	@ManyToOne
	@JoinColumn(name = "pos_id", referencedColumnName = "id")
	private Post post;
}
