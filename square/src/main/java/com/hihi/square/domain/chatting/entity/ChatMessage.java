package com.hihi.square.domain.chatting.entity;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.ForeignKey;
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
@Builder
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Table(name="chat_msg")
public class ChatMessage {
	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="chm_id")
	private Integer id;

	@JoinColumn(name="cha_id")
	@ManyToOne
	private ChatRoom chatRoom;

	@JoinColumn(name="usr_id")
	@ManyToOne
	private User user;

	@Column(name="send_at")
	private LocalDateTime sendAt;

	private String content;
}
