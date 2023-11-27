package com.hihi.square.domain.dibs.entity;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.hihi.square.domain.store.entity.Store;
import com.hihi.square.domain.user.entity.Customer;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(name="dibs")
public class Dibs {
	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="dib_id")
	private Integer dibId;

	@JoinColumn(name="usr_id")
	@ManyToOne
	private Customer customer;

	@JoinColumn(name="sto_id")
	@ManyToOne
	private Store store;

	@Column(name="order_at")
	private LocalDateTime orderAt;

	@Column(name="created_at")
	private LocalDateTime createdAt;


}
