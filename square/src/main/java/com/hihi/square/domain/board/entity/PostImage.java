package com.hihi.square.domain.board.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "post_image")
public class PostImage {
	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="poi_id")
	private Integer id;

	@JoinColumn(name = "pos_id")
	@ManyToOne
	private Post post;

	private String url;
	private String thumb;
}
