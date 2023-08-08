package com.hihi.square.domain.board.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hihi.square.domain.board.entity.Board;

public interface BoardRepository extends JpaRepository<Board, Integer> {
}
