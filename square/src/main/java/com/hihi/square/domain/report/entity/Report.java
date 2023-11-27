package com.hihi.square.domain.report.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.hihi.square.global.entity.BaseTime;

import lombok.Getter;

@Entity
@Getter
@Table(name = "report")
public class Report extends BaseTime {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "rep_id")
	private Integer id;
	private String type;

	// private User toUser;
	// private User fromUser;
}
