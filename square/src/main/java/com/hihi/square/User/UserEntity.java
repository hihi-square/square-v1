package com.hihi.square.User;

import java.time.LocalDateTime;

import javax.persistence.*;

import lombok.Getter;

@Entity
@Getter
@Table(name="User")
public class UserEntity {
	@Id
	@GeneratedValue
	@Column(name="usr_id")
	private int usrId;

	private String uid;
	private String password;
	private String phone;
	private String nickname;
	private String email;
	private String authenticate;
	@Column(name="created_at")
	private LocalDateTime createdAt;
	@Column(name="modified_at")
	private LocalDateTime modifiedAt;
	@Column(name="last_login")
	private LocalDateTime lastLogin;
	private String status;
	@Column(name="main_address")
	private int mainAddress;
	@Column(name="marketing_agree")
	private boolean marketingAgree;

	@Override
	public String toString() {
		return "UserEntity{" +
			"usrId=" + usrId +
			", uid='" + uid + '\'' +
			", password='" + password + '\'' +
			", phone='" + phone + '\'' +
			", nickname='" + nickname + '\'' +
			", email='" + email + '\'' +
			", authenticate='" + authenticate + '\'' +
			", createdAt=" + createdAt +
			", modifiedAt=" + modifiedAt +
			", lastLogin=" + lastLogin +
			", status='" + status + '\'' +
			", mainAddress=" + mainAddress +
			", marketingAgree=" + marketingAgree +
			'}';
	}
}
