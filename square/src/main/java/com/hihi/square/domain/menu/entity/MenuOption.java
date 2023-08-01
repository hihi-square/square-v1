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

<<<<<<< HEAD
import com.hihi.square.domain.menu.entity.enums.MenuStatus;
import com.hihi.square.domain.store.entity.Store;
=======
import com.hihi.square.domain.BaseTime;
import com.hihi.square.domain.user.entity.User;
>>>>>>> 5c5fec79860f2613543dbfd4cb240edcebdb6ad1

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
<<<<<<< HEAD
	@JoinColumn(name = "moc_id")
	private MenuOptionCategory optionCategory;

	@ManyToOne
	@JoinColumn(name = "men_id")
=======
	@JoinColumn(name = "moc_id", referencedColumnName = "name")
	private MenuOptionCategory optionCategory;

	@ManyToOne
	@JoinColumn(name = "men_id", referencedColumnName = "name")
>>>>>>> 5c5fec79860f2613543dbfd4cb240edcebdb6ad1
	private Menu menu;

	@ManyToOne
	@JoinColumn(name = "usr_id")
<<<<<<< HEAD
	private Store store;
=======
	private User user;
>>>>>>> 5c5fec79860f2613543dbfd4cb240edcebdb6ad1

	@Column(nullable = false)
	private String name;
	private String content;
	@Column(nullable = false)
	private int price;
	@ColumnDefault("OK")
	private MenuStatus status;
}
