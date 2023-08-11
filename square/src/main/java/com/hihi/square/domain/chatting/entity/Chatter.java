package com.hihi.square.domain.chatting.entity;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.hihi.square.domain.user.entity.User;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name="chatter")
@Builder
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class Chatter {
	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="chp_id")
	private Integer id;

	@ManyToOne
	@JoinColumn(name="cha_id")
	private ChatRoom chatRoom;

	@ManyToOne
	@JoinColumn(name="usr_id")
	private User user;

	@Column(name="created_at")
	private LocalDateTime createdAt;
}
