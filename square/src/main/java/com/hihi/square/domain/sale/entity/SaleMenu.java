package com.hihi.square.domain.sale.entity;

import com.hihi.square.domain.menu.entity.Menu;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;


@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "sale_menu")
public class SaleMenu {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ssm_id")
	private Integer id;

	@ManyToOne
	@JoinColumn(name = "sal_id")
	private Sale sale;

	@ManyToOne
	@JoinColumn(name = "men_id")
	private Menu menu;

	private Integer quantity;

	// @ManyToOne
	// @JoinColumn(name = "usr_id")
	// private User user;
}
