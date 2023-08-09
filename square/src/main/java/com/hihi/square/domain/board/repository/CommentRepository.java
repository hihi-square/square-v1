package com.hihi.square.domain.board.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.hihi.square.domain.board.entity.Comment;
import com.hihi.square.domain.board.entity.Post;
import com.hihi.square.domain.board.entity.Status;

public interface CommentRepository extends JpaRepository<Comment, Integer> {

	Integer countByPostAndStateEquals(Post post, Status status);

	@Query("select c from Comment c where c.post = :post and c.depth = 1 order by c.createdAt")
	List<Comment> findFirstCommentByPost(Post post);

	@Query("select c from Comment c where c.reComment = :comment and c.depth = 2 and c.state = 'S01' order by c.createdAt")
	List<Comment> findReCommentByComment(Comment comment);
}
