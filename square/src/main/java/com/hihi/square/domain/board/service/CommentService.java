package com.hihi.square.domain.board.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.persistence.Column;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import net.bytebuddy.asm.Advice;

import com.hihi.square.domain.board.dto.request.CommentUpdateRequestDto;
import com.hihi.square.domain.board.dto.request.CommentWriteRequestDto;
import com.hihi.square.domain.board.dto.request.RecommentWriteRequestDto;
import com.hihi.square.domain.board.dto.response.CommentListDto;
import com.hihi.square.domain.board.dto.response.ReCommentListDto;
import com.hihi.square.domain.board.entity.Comment;
import com.hihi.square.domain.board.entity.Post;
import com.hihi.square.domain.board.entity.Status;
import com.hihi.square.domain.board.repository.CommentRepository;
import com.hihi.square.domain.user.entity.User;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CommentService {
	private final CommentRepository commentRepository;

	public List<CommentListDto> findPostDetailComment(Post post) {
		List<Comment> commentList = commentRepository.findFirstCommentByPost(post);
		List<CommentListDto> result = new ArrayList<>();
		for(Comment comment : commentList) {
			List<Comment> recommentList = commentRepository.findReCommentByComment(comment);
			List<ReCommentListDto> recomments = new ArrayList<>();
			for(Comment c : recommentList) {
				recomments.add(
					ReCommentListDto.builder()
						.comment(c.getComment())
						.createdAt(c.getCreatedAt())
						.modifiedAt(c.getModifiedAt())
						.userId(c.getUser().getUsrId())
						.userNickname(c.getUser().getNickname())
						.build()
				);
			}
			result.add(
				CommentListDto.builder()
					.comment(comment.getComment())
					.createdAt(comment.getCreatedAt())
					.modifiedAt(comment.getModifiedAt())
					.userId(comment.getUser().getUsrId())
					.userNickname(comment.getUser().getNickname())
					.recommentList(recomments)
					.build()
			);
		}
		return result;
	}

	@Transactional
	public void writeComment(User user, Post post, CommentWriteRequestDto request) {
		Comment comment = Comment.builder()
			.user(user)
			.post(post)
			.comment(request.getComment())
			.depth(1)
			.state(Status.S01)
			.createdAt(LocalDateTime.now())
			.modifiedAt(LocalDateTime.now())
			.build();
		commentRepository.save(comment);
	}

	public Optional<Comment> findById(Integer commentId) {
		return commentRepository.findById(commentId);
	}

	@Transactional
	public void updateComment(Comment comment, CommentUpdateRequestDto request) {
		comment.updateComment(request);
		commentRepository.save(comment);
	}
	@Transactional
	public void writeRecomment(User user, Comment comment, RecommentWriteRequestDto request) {
		Comment recomment = Comment.builder()
			.user(user)
			.reComment(comment)
			.post(comment.getPost())
			.depth(2)
			.state(Status.S01)
			.createdAt(LocalDateTime.now())
			.modifiedAt(LocalDateTime.now())
			.comment(request.getComment())
			.build();
		commentRepository.save(recomment);
	}
}
