package com.hihi.square.domain.board.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.hihi.square.domain.board.dto.response.PostListDto;
import com.hihi.square.domain.board.entity.Board;
import com.hihi.square.domain.board.entity.Post;
import com.hihi.square.domain.board.repository.CommentRepository;
import com.hihi.square.domain.board.repository.PostDibsRepository;
import com.hihi.square.domain.board.repository.PostRepository;
import com.hihi.square.domain.user.entity.EmdAddress;
import com.hihi.square.domain.user.entity.User;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class PostService {

	private final PostRepository postRepository;
	private final CommentRepository commentRepository;
	private final PostDibsRepository postDibsRepository;


	public List<PostListDto> findByEmdListAndBoardWithQuery(List<EmdAddress> emdList, Board board, String query, User user) {
		List<PostListDto> result = new ArrayList<>();
		List<Post> posts = new ArrayList<>();
		if (query == null){
			posts = postRepository.findByEmdAddressAndBoard(emdList, board);
		} else {
			posts = postRepository.findByEmdAddressAndBoardAndQuery(emdList, board, query);
		}
		for(Post post : posts) {
			result.add(
				PostListDto.builder()
					.postId(post.getId())
					.title(post.getTitle())
					.content(post.getContent())
					.createdAt(post.getCreatedAt())
					.thumbnail(post.getPostImageList().isEmpty()?null:post.getPostImageList().get(0))
					.userId(post.getUser().getUsrId())
					.userNickname(post.getUser().getNickname())
					.commentCount(commentRepository.countByPost(post))
					.isLike(postDibsRepository.findByUserAndPost(user, post).isPresent())
					.userProfile(post.getUser().getProfile())
					.latitude(post.getLatitude())
					.longitude(post.getLongitude())
					.build()
			);
		}
		return result;
	}
}
