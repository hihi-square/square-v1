package com.hihi.square.domain.menu.entity;

<<<<<<< HEAD
import javax.persistence.*;
=======
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
>>>>>>> b_soyeon

import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.hihi.square.domain.BaseTime;
import com.hihi.square.domain.user.entity.User;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Table(name = "menu")
@Getter
@EntityListeners(AuditingEntityListener.class)
public class Menu extends BaseTime {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "men_id")
	private Long menuId;

	@ManyToOne
	@JoinColumn(name = "usr_id", nullable = false)
	private User user;

	@ManyToOne
	@JoinColumn(name = "mec_id")
	private MenuCategory menuCategory;

	private String name;
	private Integer price;
	private String image;
	private String thumbnail;
	// @ColumnDefault("false")
	private boolean signature;
	// @ColumnDefault("false")
	private boolean popularity;
	@Column(name = "status")
	@Enumerated(EnumType.STRING)
	private MenuStatus status;
	private String description;
	// @ColumnDefault("0")
	@Column(name = "sal_record")
	private Integer salRecord;
	private Integer sequence;

	//메뉴 삭제 시, 상태 변경
	// public void updateStatus() {
	// 	this.status = MenuStatus.OFF;
	// }
}
