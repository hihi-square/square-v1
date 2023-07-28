package com.hihi.square.domain.store.entity;

import javax.persistence.Column;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.hihi.square.domain.user.entity.EmdAddress;
import com.hihi.square.domain.user.entity.User;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Entity
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@Table(name="store")
@DiscriminatorValue("UA02")
public class Store extends User {
	@ManyToOne
	@JoinColumn(name="aem_id")
	private EmdAddress emdAddress;

	private String address;
	@Column(name="store_name")
	private String storeName;
	@Column(name="store_phone")
	private String storePhone;
	private String content;
	@Enumerated(EnumType.STRING)
	private BankType bank;
	private String account;




}
