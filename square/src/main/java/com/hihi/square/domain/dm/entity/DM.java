package com.hihi.square.domain.dm.entity;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.hihi.square.domain.user.entity.User;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "dm")
@EntityListeners(AuditingEntityListener.class)
@ToString
public class DM {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "dmi_id")
	private Long id;
	@JoinColumn(name = "from_id")
	@ManyToOne
	private User fromUser;
	@JoinColumn(name = "to_id")
	@ManyToOne
	private User toUser;
	@CreatedDate
	@Column(name = "send_at", updatable = false)
	private LocalDateTime sendAt;
	private String content;
	@Column(name = "is_read", nullable = false)
	private Boolean isRead;

}
