package com.hihi.square.domain.store.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.hihi.square.domain.user.entity.EmdAddress;
import com.hihi.square.global.BaseTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
@Builder
@AllArgsConstructor
@Table(name = "notice")
public class Notice extends BaseTime {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "sno_id")
	private Integer snoId;

	@JoinColumn(name = "aem_id")
	@ManyToOne
	private EmdAddress emdAddress;

	private String content;

	@JoinColumn(name = "usr_id")
	@ManyToOne
	private Store store;

	private String state;

	public void updateContent(String content) {
		this.content = content;
	}

	public void updateState(String state) {
		this.state = state;
	}
}
