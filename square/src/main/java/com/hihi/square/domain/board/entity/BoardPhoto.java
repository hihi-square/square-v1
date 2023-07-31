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
@Table(name = "post_image")
public class BoardPhoto extends BaseTime {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "poi_id")
	private Integer id;

	// @ManyToOne
	// @JoinColumn(name = "pos_id", referencedColumnName = "id")
	// private Post post;
	@Column(name = "file")
	private String filePath;
}
