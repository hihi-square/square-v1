package com.hihi.square.domain.store.event;

import java.util.List;

import org.springframework.context.ApplicationEvent;

import com.hihi.square.domain.store.entity.Notice;
import com.hihi.square.domain.user.entity.User;

import lombok.Getter;

@Getter
public class StoreNoticeEvent extends ApplicationEvent {
	private Notice notice;
	private String content;
	private List<User> userList;

	public StoreNoticeEvent(Notice notice, String content, List<User> userList) {
		super(notice);
		this.notice = notice;
		this.content = content;
		this.userList = userList;
	}
}
