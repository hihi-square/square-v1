package com.hihi.square.domain.user.service;

import com.hihi.square.domain.user.dto.request.UserFindIdRequestDto;
import com.hihi.square.domain.user.dto.response.UserLoginResponseDto;
import com.hihi.square.domain.user.entity.User;
import com.hihi.square.domain.user.repository.CustomerRepository;
import com.hihi.square.domain.user.repository.UserRepository;
import com.hihi.square.global.jwt.JwtService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional
public class UserService {

	private final UserRepository userRepository;
	private final PasswordEncoder passwordEncoder;
	private final JwtService jwtService;


	private final CustomerRepository customerRepository;
	public boolean validateDuplicateUid(String uid) {

		Optional<User> user = userRepository.findByUid(uid);
		return user.isPresent();

	}

	public boolean validateDuplicateNickname(String nickname) {
		Optional<User> user = userRepository.findByNickname(nickname);
		return user.isPresent();
	}


	@Transactional
	public void save(User user){
		user.passwordEncode(passwordEncoder);
		userRepository.save(user);
	}

	public Optional<User> findByUid(String uid) {
		return userRepository.findByUid(uid);
	}

	@Transactional
	public UserLoginResponseDto updateRefreshToken(User user) {
		String refreshToken = jwtService.createRefreshToken(user.getUid());
		UserLoginResponseDto successLogin = UserLoginResponseDto.builder()
				.statusCode(200)
				.message("SUCCESS_LOGIN")
				.accessToken(jwtService.createAccessToken(user.getUid()))
				.refreshToken(refreshToken)
				.build();
		userRepository.updateRefreshToken(refreshToken, user.getUid());
		return successLogin;

	}

	public Optional<User> findUserId(UserFindIdRequestDto request) {
		return userRepository.findByEmailAndPhone(request.getEmail(), request.getPhone());
	}

	@Transactional
	public void updatePassword(String uid, String newPassword) {
		userRepository.updatePassword(uid, passwordEncoder.encode(newPassword));
	}
}
