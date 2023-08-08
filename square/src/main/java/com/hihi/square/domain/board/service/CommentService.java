package com.hihi.square.domain.board.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.hihi.square.domain.board.dto.response.CommentListDto;
import com.hihi.square.domain.board.dto.response.ReCommentListDto;
import com.hihi.square.domain.board.entity.Comment;
import com.hihi.square.domain.board.entity.Post;
import com.hihi.square.domain.board.repository.CommentRepository;

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
}
