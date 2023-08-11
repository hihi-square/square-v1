package com.hihi.square.domain.chatting.entity;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name="chat_room")
@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ChatRoom {
	@Id
	@Column(name="cha_id")
	private String id;

	@Column(name="created_at")
	private LocalDateTime createdAt;

}
