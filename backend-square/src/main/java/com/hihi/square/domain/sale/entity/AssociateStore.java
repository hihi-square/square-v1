package com.hihi.square.domain.sale.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.hihi.square.domain.user.entity.User;

import lombok.Getter;

@Entity
@Getter
@Table(name = "associate_store")
public class AssociateStore {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "sas_id")
	private Integer id;
	@ManyToOne
	@JoinColumn(name = "usr_id")
	private User user;
	@ManyToOne
	@JoinColumn(name = "sac_id")
	private Associate associate;
	@Column(name = "accept_status")
	private String acceptStatus;
}
