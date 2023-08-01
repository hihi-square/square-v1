package com.hihi.square.domain.store.dto.request;

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
import com.hihi.square.global.dto.request.ImageRequestDto;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class StoreNoticeWriteRequestDto {

	private String content;

	private Integer usrId;

	private List<ImageRequestDto> images = new ArrayList<>();

}
