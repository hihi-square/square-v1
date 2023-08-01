package com.hihi.square.domain.menu.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Getter;

@Entity
@Getter
@Table(name = "menu_option_category")
public class MenuOptionCategory {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "moc_id")
<<<<<<< HEAD
	private Long id;
=======
	private Integer id;
>>>>>>> 5c5fec79860f2613543dbfd4cb240edcebdb6ad1
	private String name;
	private Integer order;
}
