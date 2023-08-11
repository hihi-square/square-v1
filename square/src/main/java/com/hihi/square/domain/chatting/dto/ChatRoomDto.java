package com.hihi.square.domain.chatting.dto;

import java.util.HashSet;
import java.util.Set;

import org.springframework.web.socket.WebSocketSession;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChatRoomDto {
	private String roomId;
	private Set<WebSocketSession> sessions = new HashSet<>();

}
