package com.hihi.square.domain.dm.event;

import org.springframework.context.ApplicationEvent;

import com.hihi.square.domain.dm.entity.DM;

import lombok.Getter;

@Getter
public class DMEvent extends ApplicationEvent {
	private DM dm;

	public DMEvent(DM dm) {
		super(dm);
		this.dm = dm;
	}
}
