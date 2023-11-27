package com.hihi.square.domain.dm.dto.response;

import java.time.LocalDateTime;

import com.hihi.square.domain.user.entity.User;

import lombok.Data;

@Data
public class DMDetailResponseDto {
	private Long id;
	private User fromUser;
	private LocalDateTime sendAt;
	private String content;
}
