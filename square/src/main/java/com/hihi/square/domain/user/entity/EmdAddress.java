package com.hihi.square.domain.user.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Entity
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@Table(name="emd_address")
public class EmdAddress {
	@Id @GeneratedValue
	@Column(name="aem_id")
	private Integer aemId;

	@Column(name="adm_code")
	private String amdCode;
	private String name;

	// @ManyToOne
	// @JoinColumn(name = "asi_id")
	// private SiggAddress siggAddress;
}
