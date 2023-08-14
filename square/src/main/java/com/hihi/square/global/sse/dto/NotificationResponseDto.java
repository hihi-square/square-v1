package com.hihi.square.global.sse.dto;

import com.hihi.square.global.sse.entity.Notification;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

// @Schema(description = "알림 Dto")
@Getter
@Setter
public class NotificationResponseDto {
	private Long id;
	private String content;
	private String url;
	private Boolean isRead;

	@Builder
	public NotificationResponseDto(Notification notification) {
		this.id = notification.getId();
		this.content = notification.getContent();
		this.url = notification.getUrl();
		this.isRead = notification.getIsRead();
	}

}