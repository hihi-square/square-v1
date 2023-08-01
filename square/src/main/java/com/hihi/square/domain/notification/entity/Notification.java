package com.hihi.square.domain.notification.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.hihi.square.domain.user.entity.User;

import lombok.Getter;

@Entity
@Getter
@Table(name = "notification")
public class Notification {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ala_id")
	private Integer id;

	@ManyToOne
	@JoinColumn(name = "usr_id")
	private User user;

	private String type;
	private String content;
	@Column(name = "related_url")
	private String relatedUrl;
	@Column(name = "is_read")
	private Integer isRead;
}
