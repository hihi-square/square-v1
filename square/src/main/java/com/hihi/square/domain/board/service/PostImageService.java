package com.hihi.square.domain.board.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.hihi.square.domain.board.entity.Post;
import com.hihi.square.domain.board.entity.PostImage;
import com.hihi.square.domain.board.repository.PostImageRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PostImageService {

	private final PostImageRepository postImageRepository;

	public List<PostImage> findByPost(Post post) {
		return postImageRepository.findByPost(post);
	}

}
