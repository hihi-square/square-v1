package com.hihi.square.domain.user.entity;

import java.time.LocalDateTime;

import javax.persistence.*;
import javax.validation.constraints.Pattern;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.CollectionId;

@Entity
@Getter
@NoArgsConstructor
@SuperBuilder
@AllArgsConstructor
@Table(name="user")
@Inheritance(strategy = InheritanceType.JOINED)
@DiscriminatorColumn(name="authenticate", discriminatorType = DiscriminatorType.STRING)
public class User {
	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="usr_id")
	private Integer usrId;

	private String uid;
	private String password;
	private String phone;
	private String nickname;
	private String name;
	@Pattern(regexp = "[a-zA-z0-9]+@[a-zA-z]+[.]+[a-zA-z.]+")
	private String email;
	@Column(name="created_at")
	private LocalDateTime createdAt;
	@Column(name="modified_at")
	private LocalDateTime modifiedAt;
	@Column(name="last_login")
	private LocalDateTime lastLogin;
	@Enumerated(EnumType.STRING)
	private UserStatusType status;
	@Column(name="main_address")
	private Integer mainAddress;
	@Column(name="marketing_agree")
	private boolean marketingAgree;
//	@Column(name="refresh_token")
//	private Token refreshToken;

}
