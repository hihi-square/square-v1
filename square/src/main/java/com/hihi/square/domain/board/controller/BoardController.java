package com.hihi.square.domain.board.controller;

import java.util.List;
import java.util.Optional;

import javax.websocket.server.PathParam;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.amazonaws.Response;
import com.hihi.square.domain.board.dto.request.PostWriteRequestDto;
import com.hihi.square.domain.board.dto.response.PostListDto;
import com.hihi.square.domain.board.dto.response.PostListResponseDto;
import com.hihi.square.domain.board.entity.Board;
import com.hihi.square.domain.board.service.BoardService;
import com.hihi.square.domain.board.service.PostService;
import com.hihi.square.domain.store.entity.Store;
import com.hihi.square.domain.user.entity.Customer;
import com.hihi.square.domain.user.entity.EmdAddress;
import com.hihi.square.domain.user.entity.User;
import com.hihi.square.domain.user.service.EmdAddressService;
import com.hihi.square.domain.user.service.UserService;
import com.hihi.square.global.common.CommonResponseDto;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/community")
@RequiredArgsConstructor
public class BoardController {

	private final UserService userService;
	private final EmdAddressService emdAddressService;
	private final BoardService boardService;
	private final PostService postService;

	// 읍면동과 depth에 따른 포스트 가져오기
	@GetMapping("/{boardId}/{emdId}/{depth}")
	public ResponseEntity getBoardPosts(Authentication authentication,@PathVariable("boardId") Integer boardId, @PathVariable("emdId") Integer emdId, @PathVariable("depth") Integer depth, @PathParam("query") String query){
		String uid = authentication.getName();
		User user = userService.findByUid(uid).get();
		Optional<Board> optionalBoard = boardService.findById(boardId);
		if (optionalBoard.isEmpty()) {
			return new ResponseEntity(CommonResponseDto.builder().statusCode(400).message("INVALID_BOARD_ID").build(), HttpStatus.BAD_REQUEST);
		}
		Board  board = optionalBoard.get();
		List<EmdAddress> emdList = emdAddressService.getEmdAddressWithDepth(emdId, depth);
		List<PostListDto> result = postService.findByEmdListAndBoardWithQuery(emdList, board, query, user);
		return new ResponseEntity(PostListResponseDto.builder().statusCode(200).posts(result).build(), HttpStatus.OK);
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
		if ((user instanceof Customer && board.getUserWrite()) || (user instanceof Store && board.getStoreWrite())) {
			postService.writePost(user, board, request);
			return new ResponseEntity(CommonResponseDto.builder().statusCode(201).message("SUCCESS").build(), HttpStatus.CREATED);
		} else {
			return new ResponseEntity(CommonResponseDto.builder().statusCode(400).message("NOT_AUTHENTICATE_BOARD").build(), HttpStatus.BAD_REQUEST);
		}
	}

}
