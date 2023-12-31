package com.hihi.square.domain.board.controller;

import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hihi.square.domain.board.dto.request.CommentUpdateRequestDto;
import com.hihi.square.domain.board.dto.request.CommentWriteRequestDto;
import com.hihi.square.domain.board.dto.request.RecommentWriteRequestDto;
import com.hihi.square.domain.board.entity.Comment;
import com.hihi.square.domain.board.entity.Post;
import com.hihi.square.domain.board.service.CommentService;
import com.hihi.square.domain.board.service.PostService;
import com.hihi.square.domain.user.entity.User;
import com.hihi.square.domain.user.service.UserService;
import com.hihi.square.global.common.CommonResponseDto;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequiredArgsConstructor
@RequestMapping("/community/comment")
@Slf4j
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
			return new ResponseEntity(CommonResponseDto.builder().statusCode(400).message("INVALID_POST_ID").build(),
				HttpStatus.BAD_REQUEST);
		}
		Post post = optionalPost.get();
		commentService.writeComment(user, post, request);
		return new ResponseEntity(CommonResponseDto.builder().statusCode(201).message("SUCCESS_CREATE").build(),
			HttpStatus.CREATED);
	}

	// 댓글 수정
	@PatchMapping
	public ResponseEntity updateComment(Authentication authentication, @RequestBody CommentUpdateRequestDto request) {
		String uid = authentication.getName();
		Optional<Comment> optionalComment = commentService.findById(request.getCommentId());
		if (optionalComment.isEmpty()) {
			return new ResponseEntity(CommonResponseDto.builder().statusCode(400).message("INVALID_COMMENT_ID").build(),
				HttpStatus.BAD_REQUEST);
		}
		Comment comment = optionalComment.get();
		if (!comment.getUser().getUid().equals(uid)) {
			return new ResponseEntity(CommonResponseDto.builder().statusCode(400).message("NOT_USER_COMMENT").build(),
				HttpStatus.BAD_REQUEST);
		}
		commentService.updateComment(comment, request);
		return new ResponseEntity(CommonResponseDto.builder().statusCode(200).message("SUCCESS").build(),
			HttpStatus.OK);
	}

	// 대댓글 작성
	@PostMapping("/recomment")
	public ResponseEntity writeRecomment(Authentication authentication, @RequestBody RecommentWriteRequestDto request) {
		String uid = authentication.getName();
		User user = userService.findByUid(uid).get();
		Optional<Comment> optionalComment = commentService.findById(request.getCommentId());
		if (optionalComment.isEmpty()) {
			return new ResponseEntity(CommonResponseDto.builder().statusCode(400).message("INVALID_COMMENT_ID").build(),
				HttpStatus.BAD_REQUEST);
		}
		Comment comment = optionalComment.get();
		commentService.writeRecomment(user, comment, request);
		return new ResponseEntity(CommonResponseDto.builder().statusCode(201).message("SUCCESS_CREATE").build(),
			HttpStatus.CREATED);
	}

	// 댓글 삭제
	@DeleteMapping("/{id}")
	public ResponseEntity deleteComment(Authentication authentication, @PathVariable("id") Integer commentId) {
		String uid = authentication.getName();
		log.info("uid : {}", uid);
		Optional<Comment> optionalComment = commentService.findById(commentId);
		if (optionalComment.isEmpty()) {
			return new ResponseEntity(CommonResponseDto.builder().statusCode(400).message("INVALID_COMMENT_ID").build(),
				HttpStatus.BAD_REQUEST);
		}
		Comment comment = optionalComment.get();
		if (!comment.getUser().getUid().equals(uid)) {
			return new ResponseEntity(CommonResponseDto.builder().statusCode(400).message("NOT_USER_COMMENT").build(),
				HttpStatus.BAD_REQUEST);
		}
		commentService.deleteByComment(comment);
		return new ResponseEntity(CommonResponseDto.builder().statusCode(200).message("SUCCESS").build(),
			HttpStatus.OK);
	}
}
