package com.hihi.square.domain.admin.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.hihi.square.global.BaseTime;

import lombok.Getter;

@Entity
@Getter
@Table(name = "faq")
public class FAQ extends BaseTime {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "faq_id")
	private Integer id;

	@ManyToOne
	@JoinColumn(name = "fac_id", referencedColumnName = "name")
	private FAQCategory category;

	private String question;
	private String answer;
	private Integer order;
}