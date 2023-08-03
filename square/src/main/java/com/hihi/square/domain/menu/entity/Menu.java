package com.hihi.square.domain.menu.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.hihi.square.domain.BaseTime;
import com.hihi.square.domain.user.entity.User;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Table(name = "menu")
@Getter
@EntityListeners(AuditingEntityListener.class)
@ToString
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
	// @Enumerated(EnumType.ORDINAL)
	@Column(name = "status")
	private MenuStatus status;
	private String description;
	// @ColumnDefault("0")
	@Column(name = "sal_record")
	private Integer salRecord;
	private Integer sequence;

	public void updateStatus() {
		this.status = MenuStatus.OFF;
	}
}
