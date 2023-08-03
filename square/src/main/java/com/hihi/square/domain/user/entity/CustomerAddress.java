package com.hihi.square.domain.user.entity;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Entity
@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(name="customerAddress")
public class CustomerAddress {
	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="uca_id")
	private Integer ucaId;

	@ManyToOne
	@JoinColumn(name="usr_id")
	private Customer customer;

	@ManyToOne
	@JoinColumn(name="aem_id")
	private EmdAddress emdAddress;

	private String address;
	private LocalDateTime createdAt;

}
