package com.hihi.square.domain.dm.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

//post request dto
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class WriteMessageRequest {
	private String authorName;
	private String content;
}