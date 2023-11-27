package com.hihi.square.domain.dm.dto.request;

import javax.validation.constraints.NotEmpty;

import com.hihi.square.domain.dm.entity.DM;
import com.hihi.square.domain.user.entity.User;

import lombok.Data;

@Data
public class DMRequestDto {
	@NotEmpty
	private Integer toId;
	private User toUser;
	@NotEmpty
	private String content;
	private Integer fromId;
	private User fromUser;
	private Boolean isRead;

	public DM toEntity() {
		DM dm = DM.builder()
			.toUser(toUser.builder().usrId(toId).build())
			.fromUser(fromUser.builder().usrId(fromId).build())
			.content(content)
			.isRead(isRead)
			.build();
		return dm;
	}
}
