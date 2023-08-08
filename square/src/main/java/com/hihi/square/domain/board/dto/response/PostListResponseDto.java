package com.hihi.square.domain.board.dto.response;

import java.util.ArrayList;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PostListResponseDto {

	private Integer statusCode;
	private List<PostListDto> posts = new ArrayList<>();
}
