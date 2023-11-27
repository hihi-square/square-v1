package com.hihi.square.domain.board.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.hihi.square.domain.board.entity.Board;
import com.hihi.square.domain.board.entity.Post;
import com.hihi.square.domain.user.entity.EmdAddress;
import com.hihi.square.domain.user.entity.User;

public interface PostRepository extends JpaRepository<Post, Integer> {

	@Query("select p from Post p where p.board = :board and p.emdAddress in (:emdList) order by p.createdAt desc")
	List<Post> findByEmdAddressAndBoard(@Param("emdList") List<EmdAddress> emdList, @Param("board") Board board);

	@Query("select p from Post p where p.board = :board and p.emdAddress in (:emdList) and (p.title like CONCAT('%', :query, '%') OR p.content like CONCAT('%', :query, '%')) order by p.createdAt desc")
	List<Post> findByEmdAddressAndBoardAndQuery(List<EmdAddress> emdList, Board board, String query);

	List<Post> findByUser(User user);
}
