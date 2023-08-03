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

import com.hihi.square.domain.BaseTime;
import com.hihi.square.domain.user.entity.User;

import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "menu")
@Getter
@Setter
// @EntityListeners(AuditingEntityListener.class)
public class Menu extends BaseTime {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "men_id")
	private Long id;

	@ManyToOne
	@JoinColumn(name = "sto_id", nullable = false)
	private User user;

	// @OneToOne
	// @JoinColumn(name = "scm_id")
	// private StoreMenuCategory storeMenuCategory;
	private int scm_id;

	@ManyToOne
	@JoinColumn(name = "mec_id")
	private MenuCategory menuCategory;

	private String name;
	private Integer price;
	private Integer image;
	@ColumnDefault("false")
	private boolean signature;
	@ColumnDefault("false")
	private boolean popularity;
	@Column(name = "status")
	@ColumnDefault("ON")
	private MenuStatus status;
	private String description;
	private Integer sal_record;

}
