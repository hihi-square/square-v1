package com.hihi.square.domain.sale.entity;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.hihi.square.domain.BaseTime;
import com.hihi.square.domain.board.entity.Status;

import lombok.Getter;

@Entity
@Getter
@Table(name = "associate")
public class Associate extends BaseTime {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "sac_id")
	private Integer sac_id;
	private String name;
	private String content;
	private Integer price;
	@Column(name = "state")
	private Status status;
	@Column(name = "start_at")
	private LocalDateTime startAt;
	@Column(name = "end_at")
	private LocalDateTime endAt;
}
