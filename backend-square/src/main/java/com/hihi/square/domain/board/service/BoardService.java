package com.hihi.square.domain.board.service;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.hihi.square.domain.board.entity.Board;
import com.hihi.square.domain.board.repository.BoardRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BoardService {
	private final BoardRepository boardRepository;

	public Optional<Board> findById(Integer boardId) {
		return boardRepository.findById(boardId);
	}
}
