package com.hihi.square.menu.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Getter;
import lombok.ToString;

@Entity
@Getter
@Table
@ToString
public class MenuOptionEntity {
	@Id
	private int meo_id;

	// private int moc_id;
	// private int men_id;
	@Column(nullable = false)
	private String name;
	@Column(nullable = false)
	private int price;
	private String content;
	@Column(name = "status", nullable = false)
	private MenuStatus optionStatus;

}
