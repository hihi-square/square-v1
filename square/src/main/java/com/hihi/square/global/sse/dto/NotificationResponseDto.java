package com.hihi.square.global.sse.dto;

import com.hihi.square.global.sse.entity.Notification;

import lombok.Builder;
import lombok.Data;

// @Getter
// @Setter
@Data
public class NotificationResponseDto {
	private Long id;
	private String content;
	private String storeName;
	private Boolean isRead;

	@Builder
	public NotificationResponseDto(Notification notification) {
		this.id = notification.getId();
		this.content = notification.getContent();
		this.storeName = notification.getData();
		this.isRead = notification.getIsRead();
	}
}