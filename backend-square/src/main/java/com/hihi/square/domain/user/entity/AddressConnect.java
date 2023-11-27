package com.hihi.square.domain.user.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Value;
import lombok.experimental.SuperBuilder;

@Entity
@Getter
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "address_connect")
public class AddressConnect {
	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="acc_id")
	private Integer id;

	@Column(name="from_id")
	private Integer fromId;
	@Column(name="to_id")
	private Integer toId;

}
