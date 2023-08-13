package com.hihi.square.domain.store.event;

import org.springframework.context.ApplicationEvent;

import com.hihi.square.domain.store.entity.Store;

import lombok.Getter;

@Getter
public class StoreNoticeEvent extends ApplicationEvent {
	private Store store;
	private String content;

	public StoreNoticeEvent(Store store, String content) {
		super(store);
		this.store = store;
		this.content = content;
	}
}
