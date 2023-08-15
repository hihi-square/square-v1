package com.hihi.square.domain.user.entity;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.DiscriminatorColumn;
import javax.persistence.DiscriminatorType;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Transient;
import javax.validation.constraints.Pattern;

import org.springframework.security.crypto.password.PasswordEncoder;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Entity
@Getter
@NoArgsConstructor
@SuperBuilder
@AllArgsConstructor
@Table(name = "user")
@Inheritance(strategy = InheritanceType.JOINED)
@DiscriminatorColumn(name = "authenticate", discriminatorType = DiscriminatorType.STRING)
public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "usr_id")
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
	@Column(name = "created_at")
	private LocalDateTime createdAt;
	@Column(name = "modified_at")
	private LocalDateTime modifiedAt;
	@Column(name = "last_login")
	private LocalDateTime lastLogin;
	@Enumerated(EnumType.STRING)
	private UserStatusType status;
	@JoinColumn(name = "main_address")
	@ManyToOne
	private EmdAddress mainAddress;
	@Column(name = "marketing_agree")
	private boolean marketingAgree;
	@Column(name = "refresh_token")
	private String refreshToken;
	private String profile;
	@Column(name="profile_thumb")
	private String profileThumb;

	public User(String uid, String name, String nickname, String email) {
		this.uid = uid;
		this.name = name;
		this.nickname = nickname;
		this.email = email;
	}

	@Transient
	public String getDecriminatorValue() {
		return this.getClass().getAnnotation(DiscriminatorValue.class).value();
	}

	public void updateRefreshToken(String updateRefreshToken) {
		this.refreshToken = updateRefreshToken;
	}

	public void passwordEncode(PasswordEncoder passwordEncoder) {
		this.password = passwordEncoder.encode(this.password);
	}

	public void resetRefreshToken() {
		this.refreshToken = null;
	}

	public void updateUserInfo(String nickname, String phone, String email) {
		this.nickname = nickname;
		this.phone = phone;
		this.email = email;
	}

	public void updateUserProfile(String url, String thumbnail) {
		this.profile = url;
		this.profileThumb = thumbnail;
	}

	public void setPasswordNull() {
		this.password = "";
	}

	protected void updateMainAddress(EmdAddress emdAddress) {
		this.mainAddress = emdAddress;
	}

	public void updateUserAddress(EmdAddress mainAddress) {
		this.mainAddress = mainAddress;
	}
}
