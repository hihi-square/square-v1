package com.hihi.square.domain.menu.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.PrePersist;
import javax.persistence.Table;

import com.hihi.square.domain.user.entity.User;
import com.hihi.square.global.entity.BaseTime;

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
@Getter
@Table(name = "menu_option")
@ToString
public class MenuOption extends BaseTime {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "meo_id")
	private Long id;

	@ManyToOne
	@JoinColumn(name = "moc_id")
	private MenuOptionCategory optionCategory;

	@ManyToOne
	@JoinColumn(name = "men_id")
	private Menu menu;

	@ManyToOne
	@JoinColumn(name = "usr_id")
	private User user;

	@Column(nullable = false)
	private String name;
	private String content;
	@Column(nullable = false)
	private Integer price;
	@Enumerated(EnumType.STRING)
	private MenuStatus status;
	private Integer sequence;

	@PrePersist
	public void setDefaultValues() {
		if (this.price == null)
			this.price = 0;
		if (this.status == null)
			this.status = MenuStatus.OFF;
		if (this.sequence == null)
			this.sequence = 0;
	}
}
