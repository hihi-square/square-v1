package com.hihi.square.domain.board.controller;

import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hihi.square.domain.board.entity.Post;
import com.hihi.square.domain.board.service.PostDibsService;
import com.hihi.square.domain.board.service.PostService;
import com.hihi.square.domain.user.entity.User;
import com.hihi.square.domain.user.service.UserService;
import com.hihi.square.global.common.CommonResponseDto;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/community/dibs")
@RequiredArgsConstructor
public class PostDibsController {

	private final UserService userService;
	private final PostService postService;
	private final PostDibsService postDibsService;

	// 좋아요하기
	@PostMapping("/{id}")
	public ResponseEntity likePost(Authentication authentication, @PathVariable("id") Integer postId) {
		String uid = authentication.getName();
		User user = userService.findByUid(uid).get();
		Optional<Post> optionalPost = postService.findById(postId);
		if (optionalPost.isEmpty()){
			return new ResponseEntity(CommonResponseDto.builder().statusCode(400).message("INVALID_POST_ID").build(), HttpStatus.BAD_REQUEST);
		}
		Post post = optionalPost.get();
		if (postDibsService.findByUserAndPost(user, post).isPresent()) {
			return new ResponseEntity(CommonResponseDto.builder().statusCode(400).message("ALREADY_DIB").build(), HttpStatus.BAD_REQUEST);
		}
		postDibsService.likePost(user, post);
		return new ResponseEntity(CommonResponseDto.builder().statusCode(201).message("SUCCESS_LIKE").build(), HttpStatus.CREATED);
	}
}
