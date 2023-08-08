package com.hihi.square.domain.store.dto.request;

import com.hihi.square.domain.image.dto.request.ImageRequestDto;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
public class StoreNoticeWriteRequestDto {

	private String content;

	private String state;

	private List<ImageRequestDto> images = new ArrayList<>();

}
