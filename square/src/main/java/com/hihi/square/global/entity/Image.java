package com.hihi.square.global.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Entity
@Getter
@NoArgsConstructor
@SuperBuilder
@AllArgsConstructor
@Table(name="image")
public class Image {
	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="img_id")
	private Integer imgId;

	private String url;
	@Column(name="orders")
	private Integer order;
	private String type;
	@Column(name="connected_id")
	private Integer connectedId;
	private String thumbnail;
}
