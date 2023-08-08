package com.hihi.square.domain.board.service;

import java.time.LocalDateTime;
import java.util.Optional;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.transaction.Transactional;

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
	@Transactional
	public void likePost(User user, Post post) {
		PostDibs postDibs = PostDibs.builder()
			.user(user)
			.post(post)
			.createdAt(LocalDateTime.now())
			.build();
		postDibsRepository.save(postDibs);
	}

	@Transactional
	public void cancelLikePost(User user, Post post) {
		postDibsRepository.deleteByUserAndPost(user, post);
	}
}
