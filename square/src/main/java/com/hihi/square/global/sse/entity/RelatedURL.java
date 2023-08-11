package com.hihi.square.global.sse.entity;

import javax.persistence.Column;
import javax.persistence.Embeddable;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Embeddable
@NoArgsConstructor
public class RelatedURL {
	@Column(nullable = false)
	private String url;

	public RelatedURL(String url) {
		this.url = url;
	}
}