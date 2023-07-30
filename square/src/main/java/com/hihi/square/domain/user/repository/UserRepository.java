package com.hihi.square.domain.user.repository;

import com.hihi.square.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {

    public Optional<User> findByUid(String uid);

    public Optional<User> findByNickname(String nickname);

	Optional<User> findByRefreshToken(String refreshToken);

	//    public void save(User user);
}
