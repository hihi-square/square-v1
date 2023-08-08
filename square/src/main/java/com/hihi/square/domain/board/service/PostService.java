package com.hihi.square.domain.board.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.hihi.square.domain.board.dto.request.PostWriteRequestDto;
import com.hihi.square.domain.board.dto.response.PostListDto;
import com.hihi.square.domain.board.entity.Board;
import com.hihi.square.domain.board.entity.Comment;
import com.hihi.square.domain.board.entity.Post;
import com.hihi.square.domain.board.entity.PostImage;
import com.hihi.square.domain.board.entity.Status;
import com.hihi.square.domain.board.repository.CommentRepository;
import com.hihi.square.domain.board.repository.PostDibsRepository;
import com.hihi.square.domain.board.repository.PostImageRepository;
import com.hihi.square.domain.board.repository.PostRepository;
import com.hihi.square.domain.user.entity.EmdAddress;
import com.hihi.square.domain.user.entity.User;
import com.hihi.square.global.s3.dto.FileThumbDto;

import lombok.Builder;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class PostService {

	private final PostRepository postRepository;
	private final CommentRepository commentRepository;
	private final PostDibsRepository postDibsRepository;
	private final PostImageRepository postImageRepository;



	@Transactional
	public List<PostListDto> findByEmdListAndBoardWithQuery(List<EmdAddress> emdList, Board board, String query, User user) {
		List<PostListDto> result = new ArrayList<>();
		List<Post> posts = new ArrayList<>();
		if (query == null) {
			posts = postRepository.findByEmdAddressAndBoard(emdList, board);
		} else {
			posts = postRepository.findByEmdAddressAndBoardAndQuery(emdList, board, query);
		}
		for (Post post : posts) {
			result.add(
				PostListDto.builder()
					.postId(post.getId())
					.title(post.getTitle())
					.content(post.getContent())
					.createdAt(post.getCreatedAt())
					.thumbnail(post.getPostImageList().isEmpty() ? null : post.getPostImageList().get(0))
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
	@Transactional
	public void writePost(User user, Board board, EmdAddress emdAddress, PostWriteRequestDto request) {
		Post post = Post.builder()
			.board(board)
			.emdAddress(emdAddress)
			.title(request.getTitle())
			.content(request.getContent())
			.latitude(request.getLatitude())
			.longitude(request.getLongitude())
			.user(user)
			.viewCnt(0)
			.status(Status.S01)
			.createdAt(LocalDateTime.now())
			.modifiedAt(LocalDateTime.now())
			.build();
		postRepository.save(post);
		for(int i=0;i<request.getImages().size();i++){
			FileThumbDto image = request.getImages().get(i);
			postImageRepository.save(
				PostImage.builder()
					.url(image.getUrl())
					.thumb(image.getThumb())
					.order(i+1)
					.post(post)
					.build()
			);
		}
	}
}
