package com.hihi.square.domain.store.dto.response;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.hihi.square.domain.store.entity.Store;
import com.hihi.square.domain.user.entity.EmdAddress;
import com.hihi.square.global.dto.response.ImageResponseDto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class StoreNoticeResponseDto {
	private Integer snoId;


	private String content;

	private LocalDateTime createdAt;

	private LocalDateTime modifiedAt;

	private List<ImageResponseDto> images = new ArrayList<>();

}
