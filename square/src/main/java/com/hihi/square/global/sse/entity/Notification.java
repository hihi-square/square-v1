package com.hihi.square.global.sse.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import com.hihi.square.domain.user.entity.User;
import com.hihi.square.global.entity.BaseTime;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "notification")
@EqualsAndHashCode(of = "id", callSuper=false)
public class Notification extends BaseTime {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ala_id")
	private Long id;

	private String content;

	@Column(name = "related_url")
	private String url;

	@Column(name = "is_read", nullable = false)
	private Boolean isRead;

	@Enumerated(EnumType.STRING)
	@Column(name = "type", nullable = false)
	private NotificationType notificationType;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "usr_id")
	@OnDelete(action = OnDeleteAction.CASCADE)
	private User receiver;

	@Builder
	public Notification(User receiver, NotificationType notificationType, String content, String url,
		Boolean isRead) {
		this.receiver = receiver;
		this.notificationType = notificationType;
		this.content = content;
		this.url = url;
		this.isRead = isRead;
	}
}