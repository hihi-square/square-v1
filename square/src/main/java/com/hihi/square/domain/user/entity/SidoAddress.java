package com.hihi.square.domain.user.entity;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

// @Entity
// @Data
// @SuperBuilder
// @NoArgsConstructor
// @AllArgsConstructor
// @Table(name="sido_address")
public class SidoAddress {
	@Id @GeneratedValue
	@Column(name="asd_id")
	private int asdId;
	//
	// @Column(name="adm_code")
	// private String amdCode;
	// private String name;
	//
	// @OneToMany(mappedBy = "asd_id")
	// private List<SiggAddress> siggAddressList;

}
