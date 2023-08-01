package com.hihi.square.domain.sale.entity;

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
import com.hihi.square.domain.board.entity.Status;
import com.hihi.square.domain.user.entity.User;

import lombok.Getter;

@Entity
@Getter
@Table(name = "sale")
public class Sale extends BaseTime {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "sal_id")
	private Integer id;
	@Column(name = "started_at")
	private LocalDateTime startedAt;
	@Column(name = "finished_at")
	private LocalDateTime finishedAt;
	@Column(name = "real_finished_at")
	private LocalDateTime realFinishedAt;
	private Integer price;
	@Enumerated(EnumType.STRING)
	private Status status;
	@ManyToOne
	@JoinColumn(name = "usr_id")
	private User user;
}
