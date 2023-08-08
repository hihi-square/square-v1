package com.hihi.square.domain.board.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hihi.square.domain.board.entity.Comment;
import com.hihi.square.domain.board.entity.Post;

public interface CommentRepository extends JpaRepository<Comment, Integer> {

	Integer countByPost(Post post);
}
