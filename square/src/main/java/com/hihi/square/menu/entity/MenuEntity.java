package com.hihi.square.menu.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.ColumnDefault;

import lombok.Getter;
import lombok.ToString;

@Entity
@Getter
@Table(name = "Menu")
@ToString
// @EntityListeners(AuditingEntityListener.class)
public class MenuEntity extends BaseTime {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	// @GeneratedValue
	@Column(name = "men_id")
	private Long id;

	// @ManyToOne
	// @JoinColumn(name = "sto_id")
	// private Store sto;
	//
	// @OneToMany
	// @JoinColumn(name = "mec_id")
	// private List<StoreMenuCategory> storeMenuCategoryList = new ArrayList<>();
	//
	// @OneToMany
	// @JoinColumn(name = "scm_id")
	// private List<MenuCategory> menuCategoryList = new ArrayList<>();

	private int sto_id;
	private int mec_id;
	private int scm_id;

	private String name;
	private int price;
	private int image;
	@ColumnDefault("false")
	private boolean signature;
	@ColumnDefault("false")
	private boolean popularity;
	// @CreatedDate
	// @Column(name = "created_at")
	// private LocalDateTime createdAt;
	// @LastModifiedDate
	// @Column(name = "modified_at")
	// private LocalDateTime modifiedAt;
	@Column(name = "status")
	@ColumnDefault("ON")
	private MenuStatus saleStatus;
	private String description;

}
