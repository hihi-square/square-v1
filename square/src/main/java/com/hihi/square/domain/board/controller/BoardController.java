package com.hihi.square.domain.board.controller;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.websocket.server.PathParam;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.amazonaws.Response;
import com.hihi.square.domain.board.dto.request.PostUpdateRequestDto;
import com.hihi.square.domain.board.dto.request.PostWriteRequestDto;
import com.hihi.square.domain.board.dto.response.CommentListDto;
import com.hihi.square.domain.board.dto.response.PostDetailResponseDto;
import com.hihi.square.domain.board.dto.response.PostListDto;
import com.hihi.square.domain.board.dto.response.PostListResponseDto;
import com.hihi.square.domain.board.dto.response.PostUpdateResponseDto;
import com.hihi.square.domain.board.entity.Board;
import com.hihi.square.domain.board.entity.Post;
import com.hihi.square.domain.board.entity.PostDibs;
import com.hihi.square.domain.board.entity.PostImage;
import com.hihi.square.domain.board.service.BoardService;
import com.hihi.square.domain.board.service.CommentService;
import com.hihi.square.domain.board.service.PostDibsService;
import com.hihi.square.domain.board.service.PostImageService;
import com.hihi.square.domain.board.service.PostService;
import com.hihi.square.domain.image.service.ImageService;
import com.hihi.square.domain.store.entity.Store;
import com.hihi.square.domain.user.entity.Customer;
import com.hihi.square.domain.user.entity.EmdAddress;
import com.hihi.square.domain.user.entity.User;
import com.hihi.square.domain.user.service.EmdAddressService;
import com.hihi.square.domain.user.service.UserService;
import com.hihi.square.global.common.CommonResponseDto;
import com.hihi.square.global.s3.dto.FileThumbDto;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/community")
@RequiredArgsConstructor
public class BoardController {

	private final UserService userService;
	private final EmdAddressService emdAddressService;
	private final BoardService boardService;
	private final PostService postService;
	private final PostImageService postImageService;

	// 읍면동과 depth에 따른 포스트 가져오기
	@GetMapping("/{boardId}/{emdId}/{depth}")
	public ResponseEntity getBoardPosts(Authentication authentication,@PathVariable("boardId") Integer boardId, @PathVariable("emdId") Integer emdId, @PathVariable("depth") Integer depth, @PathParam("query") String query){
		String uid = authentication.getName();
		User user = userService.findByUid(uid).get();
		Optional<Board> optionalBoard = boardService.findById(boardId);
		if (optionalBoard.isEmpty()) {
			return new ResponseEntity(CommonResponseDto.builder().statusCode(400).message("INVALID_BOARD_ID").build(), HttpStatus.BAD_REQUEST);
		}
		Board board = optionalBoard.get();
		List<EmdAddress> emdList = emdAddressService.getEmdAddressWithDepth(emdId, depth);
		List<PostListDto> result = postService.findByEmdListAndBoardWithQuery(emdList, board, query, user);
		return new ResponseEntity<>(PostListResponseDto.builder().statusCode(200).posts(result).build(), HttpStatus.OK);
	}

	// 게시판 글 작성
	@PostMapping
	public ResponseEntity writePost(Authentication authentication, @RequestBody PostWriteRequestDto request){
		String uid = authentication.getName();
		User user = userService.findByUid(uid).get();
		Optional<Board> optionalBoard = boardService.findById(request.getBoardId());
		if (optionalBoard.isEmpty()){
			return new ResponseEntity(CommonResponseDto.builder().statusCode(400).message("INVALID_BOARD_ID").build(), HttpStatus.BAD_REQUEST);
		}
		Board board = optionalBoard.get();
		Optional<EmdAddress> optionalEmdAddress = emdAddressService.findById(request.getEmdId());
		if (optionalEmdAddress.isEmpty()){
			return new ResponseEntity(CommonResponseDto.builder().statusCode(400).message("INVALID_EMDADDRESS").build(), HttpStatus.BAD_REQUEST);
		}
		EmdAddress emdAddress = optionalEmdAddress.get();
		if ((user instanceof Customer && board.getUserWrite()) || (user instanceof Store && board.getStoreWrite())) {
			postService.writePost(user, board, emdAddress, request);
			return new ResponseEntity(CommonResponseDto.builder().statusCode(201).message("SUCCESS").build(), HttpStatus.CREATED);
		} else {
			return new ResponseEntity(CommonResponseDto.builder().statusCode(400).message("NOT_AUTHENTICATE_BOARD").build(), HttpStatus.BAD_REQUEST);
		}
	}

	// 글 수정을 위한 get
	@GetMapping("/update/{id}")
	public ResponseEntity getUpdatePost(Authentication authentication, @PathVariable("id") Integer postId) {
		String uid = authentication.getName();
		Optional<Post> optionalPost = postService.findById(postId);
		if (optionalPost.isEmpty()) {
			return new ResponseEntity(CommonResponseDto.builder().statusCode(400).message("INVALID_POST_ID").build(),
				HttpStatus.BAD_REQUEST);
		}
		Post post = optionalPost.get();
		if (!post.getUser().getUid().equals(uid)) {
			return new ResponseEntity(CommonResponseDto.builder().statusCode(400).message("NOT_MY_POST").build(),
				HttpStatus.BAD_REQUEST);
		}
		List<PostImage> imageList = postImageService.findByPost(post);
		List<FileThumbDto> images = new ArrayList<>();
		for(PostImage image : imageList) {
			images.add(
				FileThumbDto.builder()
					.url(image.getUrl())
					.thumb(image.getThumb())
					.build()
			);
		}
		PostUpdateResponseDto response = PostUpdateResponseDto.builder()
			.postId(post.getId())
			.title(post.getTitle())
			.content(post.getContent())
			.images(images)
			.createdAt(post.getCreatedAt())
			.statusCode(200)
			.build();
		return new ResponseEntity(response, HttpStatus.OK);
	}

	// 게시글 수정
	@PatchMapping
	public ResponseEntity patchUpdatePost(Authentication authentication, @RequestBody PostUpdateRequestDto request) {
		String uid = authentication.getName();
		Optional<Post> optionalPost = postService.findById(request.getPostId());
		if (optionalPost.isEmpty()) {
			return new ResponseEntity(CommonResponseDto.builder().statusCode(400).message("INVALID_POST_ID").build(), HttpStatus.BAD_REQUEST);
		}
		Post post = optionalPost.get();
		if (!post.getUser().getUid().equals(uid)) {
			return new ResponseEntity(CommonResponseDto.builder().statusCode(400).message("NOT_USER_POST").build(), HttpStatus.BAD_REQUEST);
		}
		postService.updatePost(post, request);
		return new ResponseEntity(CommonResponseDto.builder().statusCode(200).message("UPDATE_POST").build(), HttpStatus.OK);
	}

	// 게시글 삭제
	@DeleteMapping("/{id}")
	public ResponseEntity deletePost(Authentication authentication, @PathVariable("id") Integer postId) {
		String uid = authentication.getName();
		Optional<Post> optionalPost = postService.findById(postId);
		if (optionalPost.isEmpty()) {
			return new ResponseEntity(CommonResponseDto.builder().statusCode(400).message("INVALID_POST_ID").build(), HttpStatus.BAD_REQUEST);
		}
		Post post = optionalPost.get();
		if (!post.getUser().getUid().equals(uid)) {
			return new ResponseEntity(CommonResponseDto.builder().statusCode(400).message("NOT_USER_POST").build(), HttpStatus.BAD_REQUEST);
		}
		postService.deleteByPost(post);
		return new ResponseEntity(CommonResponseDto.builder().statusCode(200).message("SUCCESS_DELETE").build(), HttpStatus.OK);
	}
	
	// 게시글 상세
	@GetMapping("/{id}")
	public ResponseEntity getPostDetail(Authentication authentication, @PathVariable("id") Integer postId){
		String uid = authentication.getName();
		User user = userService.findByUid(uid).get();
		Optional<Post> optionalPost = postService.findById(postId);
		if (optionalPost.isEmpty()){
			return new ResponseEntity(CommonResponseDto.builder().statusCode(400).message("INVALID_POST_ID").build(), HttpStatus.BAD_REQUEST);
		}
		Post post = optionalPost.get();
		PostDetailResponseDto response = postService.getPostDetail(user, post);
		return new ResponseEntity(response, HttpStatus.OK);
	}

	// 내 게시글 목록
	@GetMapping
	public ResponseEntity getMyPosts(Authentication authentication) {
		String uid = authentication.getName();
		User user = userService.findByUid(uid).get();
		List<PostListDto> result = postService.findByUser(user);
		return new ResponseEntity(PostListResponseDto.builder().statusCode(200).posts(result).build(), HttpStatus.OK);
	}


}
