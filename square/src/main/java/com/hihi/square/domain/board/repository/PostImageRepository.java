package com.hihi.square.domain.board.repository;

import java.util.List;

import javax.persistence.criteria.CriteriaBuilder;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hihi.square.domain.board.entity.Post;
import com.hihi.square.domain.board.entity.PostImage;

public interface PostImageRepository extends JpaRepository<PostImage, Integer> {
	List<PostImage> findByPost(Post post);

	void deleteAllByPost(Post post);
}
