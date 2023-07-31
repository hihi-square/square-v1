package com.hihi.square.domain.menu.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.hihi.square.domain.store.entity.Store;

import lombok.Getter;

@Entity
@Getter
@Table(name = "menu_category")
public class MenuCategory extends BaseTime {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "mec_id")
	private int id;

	@ManyToOne
	@JoinColumn(name = "usr_id")
	private Store store;

	@Column(nullable = false)
	private String name;
	@Column(nullable = false)
	private int order;

}
