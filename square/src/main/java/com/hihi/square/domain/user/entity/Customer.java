package com.hihi.square.domain.user.entity;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Entity
@SuperBuilder
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(name="customer")
@DiscriminatorValue("UA01")
public class Customer extends User{

	@Enumerated(EnumType.STRING)
	@Column(name="`rank`")
	private UserRankType rank;

	@Enumerated(EnumType.STRING)
	private UserSocialLoginType social;

	@OneToMany(mappedBy = "customer")
	// @Builder.Default
	private List<CustomerAddress> customerAddressList = new ArrayList<>();
}
