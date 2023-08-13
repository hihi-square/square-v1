package com.hihi.square.domain.user.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Entity
@Getter
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "emd_address")
public class EmdAddress {
	@Id
	@GeneratedValue
	@Column(name = "aem_id")
	private Integer aemId;


	@Column(name="asd_name")
	private String sidoName;

	@Column(name="adm_code")
	private Long admCode;
	private String name;


	@Column(name="asi_name")
	private String siggName;

	@ManyToOne
	@JoinColumn(name = "asi_id")
	private SiggAddress siggAddress;

	public String getFullName() {
		return sidoName+" "+siggName+" "+name;
	}
}
