package com.hihi.square.domain.user.service;

import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hihi.square.domain.user.entity.User;
import com.hihi.square.domain.user.repository.CustomerRepository;
import com.hihi.square.domain.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional
public class UserService {

	private final UserRepository userRepository;

	private final CustomerRepository customerRepository;
	public boolean validateDuplicateUid(String uid) {

		Optional<User> user = userRepository.findByUid(uid);
		return user.isPresent();
		// if (user.isEmpty() || !user.isPresent()) return false;
		// else return true;
	}

	public boolean validateDuplicateNickname(String nickname) {
		Optional<User> user = userRepository.findByNickname(nickname);
		return user.isPresent();
	}


	@Transactional
	public void save(User user){
		userRepository.save(user);
	}
}
