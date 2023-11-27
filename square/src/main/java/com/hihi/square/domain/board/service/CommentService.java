package com.hihi.square.domain.board.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

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
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class CommentService {
	private final CommentRepository commentRepository;

	public List<CommentListDto> findPostDetailComment(Post post) {
		List<Comment> commentList = commentRepository.findFirstCommentByPost(post);
		List<CommentListDto> result = new ArrayList<>();
		for (Comment comment : commentList) {
			List<Comment> recommentList = commentRepository.findReCommentByComment(comment);
			List<ReCommentListDto> recomments = new ArrayList<>();
			for (Comment c : recommentList) {
				recomments.add(
					ReCommentListDto.builder()
						.commentId(c.getId())
						.comment(c.getComment())
						.createdAt(c.getCreatedAt())
						.modifiedAt(c.getModifiedAt())
						.userId(c.getUser().getUsrId())
						.userNickname(c.getUser().getNickname())
						.userProfile(c.getUser().getProfile())
						.depth(c.getDepth())
						.build()
				);
			}
			result.add(
				CommentListDto.builder()
					.commentId(comment.getId())
					.comment(comment.getComment())
					.createdAt(comment.getCreatedAt())
					.modifiedAt(comment.getModifiedAt())
					.userId(comment.getUser().getUsrId())
					.userNickname(comment.getUser().getNickname())
					.isDeleted(comment.getState().equals(Status.S02))
					.userProfile(comment.getUser().getProfile())
					.recommentList(recomments)
					.depth(comment.getDepth())
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

	@Transactional
	public void deleteByComment(Comment comment) {
		if (comment.getDepth() == 1) {
			List<Comment> recommentList = commentRepository.findReCommentByComment(comment);
			if (recommentList.isEmpty())
				commentRepository.delete(comment); // 대댓글이 없는 경우 바로 삭제
			else {
				comment.delete(); // 대댓글이 있는 경우 삭제처리만 함
				commentRepository.save(comment);
			}
		} else {
			Comment parent = comment.getReComment();
			commentRepository.delete(comment);
			if (parent.getState().equals(Status.S02) && commentRepository.findReCommentByComment(parent).size() == 0) {
				commentRepository.delete(parent);
			}

		}

	}
}
