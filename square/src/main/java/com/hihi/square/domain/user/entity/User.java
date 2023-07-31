package com.hihi.square.domain.user.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.persistence.*;
import javax.validation.constraints.Pattern;
import java.time.LocalDateTime;

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

	@Column(unique = true)
	private String uid;
	private String password;
	private String phone;

	@Column(unique = true)
	private String nickname;
	private String name;
	@Column(unique = true)
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
	@Column(name="refresh_token")
	private String refreshToken;

	@Transient
	public String getDecriminatorValue() {
		return this.getClass().getAnnotation(DiscriminatorValue.class).value();
	}

	public void updateRefreshToken(String updateRefreshToken) {
		this.refreshToken = updateRefreshToken;
	}

	 public void passwordEncode(PasswordEncoder passwordEncoder){
		this.password=passwordEncoder.encode(this.password);
	 }

	 public void resetRefreshToken(){
		this.refreshToken=null;
	 }
}
