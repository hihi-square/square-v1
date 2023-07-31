package com.hihi.square.domain.menu.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.ColumnDefault;

import com.hihi.square.domain.menu.entity.enums.MenuStatus;
import com.hihi.square.domain.store.entity.Store;

import lombok.Getter;
import lombok.ToString;

@Entity
@Getter
@Table(name = "menu_option")
@ToString
public class MenuOption extends BaseTime {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "meo_id")
	private int id;

	@ManyToOne
	@JoinColumn(name = "moc_id")
	private MenuOptionCategory optionCategory;

	@ManyToOne
	@JoinColumn(name = "men_id")
	private Menu menu;

	@ManyToOne
	@JoinColumn(name = "usr_id")
	private Store store;

	@Column(nullable = false)
	private String name;
	private String content;
	@Column(nullable = false)
	private int price;
	@ColumnDefault("OK")
	private MenuStatus status;
}
