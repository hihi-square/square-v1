package com.hihi.square.domain.board.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hihi.square.domain.board.entity.Post;
import com.hihi.square.domain.board.entity.PostDibs;
import com.hihi.square.domain.user.entity.User;

public interface PostDibsRepository extends JpaRepository<PostDibs, Integer> {
	Optional<PostDibs> findByUserAndPost(User user, Post post);

	void deleteByUserAndPost(User user, Post post);
}
