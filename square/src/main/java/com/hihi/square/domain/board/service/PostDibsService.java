package com.hihi.square.domain.board.service;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.hihi.square.domain.board.entity.Post;
import com.hihi.square.domain.board.entity.PostDibs;
import com.hihi.square.domain.board.repository.PostDibsRepository;
import com.hihi.square.domain.user.entity.User;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PostDibsService {
	private final PostDibsRepository postDibsRepository;

	public Optional<PostDibs> findByUserAndPost(User user, Post post) {
		return postDibsRepository.findByUserAndPost(user, post);
	}
}
