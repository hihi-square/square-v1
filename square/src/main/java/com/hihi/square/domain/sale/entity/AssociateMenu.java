package com.hihi.square.domain.sale.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.hihi.square.domain.board.entity.Status;
import com.hihi.square.domain.menu.entity.Menu;
import com.hihi.square.domain.user.entity.User;

import lombok.Getter;

@Entity
@Getter
@Table(name = "associate_menu")
public class AssociateMenu {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "sam_id")
	private Integer id;

	@ManyToOne
	@JoinColumn(name = "sac_id")
	private Associate associate;

	@ManyToOne
	@JoinColumn(name = "men_id")
	private Menu menu;

	@ManyToOne
	@JoinColumn(name = "usr_id")
	private User user;

	private Integer quantity;
	@Column(name = "receving_price")
	private Integer recevingPrice;
	@Column(name = "state")
	private Status status;
}
