package com.hihi.square.domain.dm.dto.response;

import com.hihi.square.domain.dm.entity.DM;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@AllArgsConstructor
@Builder
public class DMResponseDto {
	private Long id;
	private String content;
	private String user;
	private Boolean isRead;

	public DMResponseDto(DM dm) {
		this.id = dm.getId();
		this.content = dm.getContent();
		this.user = dm.getFromUser().getNickname();
		this.isRead = dm.getIsRead();
	}
}