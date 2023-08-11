package com.hihi.square.domain.chatting.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hihi.square.domain.chatting.entity.ChatRoom;
import com.hihi.square.domain.user.entity.User;

public interface ChatRoomRepository extends JpaRepository<ChatRoom, String> {
	// List<ChatRoom> findByUser(User user);
	Optional<ChatRoom> findById(String id);
}
