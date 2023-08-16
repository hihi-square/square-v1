package com.hihi.square.domain.board.service;

import com.hihi.square.domain.board.dto.request.PostUpdateRequestDto;
import com.hihi.square.domain.board.dto.request.PostWriteRequestDto;
import com.hihi.square.domain.board.dto.response.CommentListDto;
import com.hihi.square.domain.board.dto.response.PostDetailResponseDto;
import com.hihi.square.domain.board.dto.response.PostListDto;
import com.hihi.square.domain.board.entity.*;
import com.hihi.square.domain.board.repository.CommentRepository;
import com.hihi.square.domain.board.repository.PostDibsRepository;
import com.hihi.square.domain.board.repository.PostImageRepository;
import com.hihi.square.domain.board.repository.PostRepository;
import com.hihi.square.domain.user.entity.EmdAddress;
import com.hihi.square.domain.user.entity.User;
import com.hihi.square.global.s3.dto.FileThumbDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class PostService {

	private final PostRepository postRepository;
	private final CommentRepository commentRepository;
	private final PostDibsRepository postDibsRepository;
	private final PostImageRepository postImageRepository;
	private final PostDibsService postDibsService;
	private final CommentService commentService;
	private final PostImageService postImageService;


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
					.thumbnail(post.getPostImageList().isEmpty() ? null : FileThumbDto.builder().url(post.getPostImageList().get(0).getUrl()).thumb(post.getPostImageList().get(0).getThumb()).build())
					.userId(post.getUser().getUsrId())
					.userNickname(post.getUser().getNickname())
					.commentCount(commentRepository.countByPostAndStateEquals(post, Status.S01))
					.isLike(postDibsRepository.findByUserAndPost(user, post).isPresent())
					.userProfile(post.getUser().getProfile())
					.latitude(post.getLatitude())
					.longitude(post.getLongitude())
					.viewCount(post.getViewCnt())
					.build()
			);
		}
		return result;
	}
	@Transactional
	public Integer writePost(User user, Board board, EmdAddress emdAddress, PostWriteRequestDto request) {
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
		return post.getId();
	}

	public Optional<Post> findById(Integer postId) {
		return postRepository.findById(postId);
	}

	@Transactional
	public void updatePost(Post post, PostUpdateRequestDto request) {
		post.updatePost(request);
		postRepository.save(post);
		postImageRepository.deleteByPost(post);
		for(int i=0;i<request.getImages().size();i++) {
			FileThumbDto image = request.getImages().get(i);
			postImageRepository.save(
				PostImage.builder()
					.post(post)
					.order(i+1)
					.url(image.getUrl())
					.thumb(image.getThumb())
					.build()
			);
		}
	}

	@Transactional
	public void deleteByPost(Post post) {
		postRepository.delete(post);
		postImageRepository.deleteByPost(post);
	}

	@Transactional
	public PostDetailResponseDto getPostDetail(User user, Post post) {
		post.upViewCnt();
		postRepository.save(post);
		List<PostImage> postImages = postImageService.findByPost(post);
		Optional<PostDibs> optionalPostDibs = postDibsService.findByUserAndPost(user, post);
		List<CommentListDto> commentList = commentService.findPostDetailComment(post);
		Integer commentCnt = commentRepository.countByPostAndStateEquals(post, Status.S01);

		List<FileThumbDto> images = new ArrayList<>();
		for(PostImage image : postImages) {
			images.add(
				FileThumbDto.builder()
					.url(image.getUrl())
					.thumb(image.getThumb())
					.build()
			);
		}

		PostDetailResponseDto response = PostDetailResponseDto.builder()
			.postId(post.getId())
			.boardId(post.getBoard().getId())
			.boardName(post.getBoard().getName())
			.userId(post.getUser().getUsrId())
			.userNickname(post.getUser().getNickname())
			.userProfile(post.getUser().getProfile())
			.emdAddress(post.getEmdAddress())
			.viewCnt(post.getViewCnt())
			.title(post.getTitle())
			.content(post.getContent())
			.createdAt(post.getCreatedAt())
			.modifiedAt(post.getModifiedAt())
			.latitude(post.getLatitude())
			.longitude(post.getLongitude())
			.images(images)
			.isLikePost(optionalPostDibs.isPresent())
			.comments(commentList)
			.commentCnt(commentCnt)
			.build();
		return response;
	}

	@Transactional
	public List<PostListDto> findByUser(User user) {
		List<PostListDto> result = new ArrayList<>();
		List<Post> posts = postRepository.findByUser(user);
		for (Post post : posts) {
			result.add(
				PostListDto.builder()
					.postId(post.getId())
					.title(post.getTitle())
					.content(post.getContent())
					.createdAt(post.getCreatedAt())
					.thumbnail(post.getPostImageList().isEmpty() ? null : FileThumbDto.builder().url(post.getPostImageList().get(0).getUrl()).thumb(post.getPostImageList().get(0).getThumb()).build())
					.userId(post.getUser().getUsrId())
					.userNickname(post.getUser().getNickname())
					.commentCount(commentRepository.countByPostAndStateEquals(post, Status.S01))
					.isLike(postDibsRepository.findByUserAndPost(user, post).isPresent())
					.userProfile(post.getUser().getProfile())
					.latitude(post.getLatitude())
					.longitude(post.getLongitude())
					.viewCount(post.getViewCnt())
					.build()
			);
		}
		return result;
	}
}
