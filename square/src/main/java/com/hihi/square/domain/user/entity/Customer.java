package com.hihi.square.domain.user.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

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

	private Long point;


	public void updatePoint(long point) {
		this.point = point;
	}

	@OneToMany(mappedBy = "customer")
	@Builder.Default
	private List<CustomerAddress> customerAddressList = new ArrayList<>();

}
