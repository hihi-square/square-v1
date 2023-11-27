package com.hihi.square.domain.menu.entity;

import com.fasterxml.jackson.annotation.JsonCreator;

public enum MenuStatus {
	//판매
	ON,
	//중지
	STOP,
	//종료
	OFF;

	@JsonCreator
	public static MenuStatus from(String value) {
		for (MenuStatus status : MenuStatus.values()) {
			if (status.name().equals(value)) {
				return status;
			}
		}
		return null;
	}
}

