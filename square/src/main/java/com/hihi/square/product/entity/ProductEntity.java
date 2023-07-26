package com.hihi.square.product.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Getter;

@Entity
@Getter
@Table(name = "menu")
public class ProductEntity {
	@Id
	@Column(name = "men_id")
	private int menId;

	private int stoId;
	private int mecId;
	private int scmId;
	@Column(name = "name")
	private String name;
	@Column(name = "price")
	private int price;
	@Column(name = "image")
	private int image;
	@Column(name = "signature")
	private boolean signature;
	@Column(name = "popularity")
	private boolean popularity;
	@Column(name = "created_at")
	private String createdAt;
	@Column(name = "modified_at")
	private String modifiedAt;
	@Column(name = "status")
	private String status;
	@Column(name = "description")
	private String description;

}
