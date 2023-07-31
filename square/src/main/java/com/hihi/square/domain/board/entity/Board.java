package com.hihi.square.domain.board.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.hihi.square.domain.BaseTime;

import lombok.Getter;

@Entity
@Getter
@Table(name = "board")
public class Board extends BaseTime {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "pob_id")
	private Integer id;
	private String name;
	private Integer anonymous;
	@Column(name = "store_access")
	private Integer storeAccess;
	@Column(name = "store_write")
	private Integer storeWrite;
	@Column(name = "user_access")
	private Integer userAccess;
	@Column(name = "user_write")
	private Integer userWrite;
	private Integer used;
}
