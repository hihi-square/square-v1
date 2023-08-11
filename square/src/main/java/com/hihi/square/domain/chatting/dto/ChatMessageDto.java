package com.hihi.square.domain.chatting.dto;

import java.time.LocalDateTime;

import lombok.Builder;
import lombok.Data;
import lombok.Setter;

@Data
@Builder
@Setter
public class ChatMessageDto {
	private String roomId;
	private Integer sender;
	private String message;
	private LocalDateTime time;
}
