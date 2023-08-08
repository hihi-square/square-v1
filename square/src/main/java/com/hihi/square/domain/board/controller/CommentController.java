package com.hihi.square.domain.board.controller;

import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hihi.square.domain.board.dto.request.CommentWriteRequestDto;
import com.hihi.square.domain.board.entity.Post;
import com.hihi.square.domain.board.service.CommentService;
import com.hihi.square.domain.board.service.PostService;
import com.hihi.square.domain.user.entity.User;
import com.hihi.square.domain.user.service.UserService;
import com.hihi.square.global.common.CommonResponseDto;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/community/comment")
public class CommentController {

	private final UserService userService;
	private final CommentService commentService;
	private final PostService postService;

	// 댓글 작성
	@PostMapping
	public ResponseEntity writeComment(Authentication authentication, @RequestBody CommentWriteRequestDto request) {
		String uid = authentication.getName();
		User user = userService.findByUid(uid).get();
		Optional<Post> optionalPost = postService.findById(request.getPostId());
		if (optionalPost.isEmpty()) {
			return new ResponseEntity(CommonResponseDto.builder().statusCode(400).message("INVALID_POST_ID").build(), HttpStatus.BAD_REQUEST);
		}
		Post post = optionalPost.get();
		commentService.writeComment(user, post, request);
		return new ResponseEntity(CommonResponseDto.builder().statusCode(201).message("SUCCESS_CREATE").build(), HttpStatus.CREATED);
	}
}
