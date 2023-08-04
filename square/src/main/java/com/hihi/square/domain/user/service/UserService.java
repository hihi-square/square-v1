package com.hihi.square.domain.user.service;

import com.hihi.square.domain.image.dto.ImageFileThumbDto;
import com.hihi.square.domain.image.dto.request.ImageRequestDto;
import com.hihi.square.domain.user.dto.request.CustomerUpdateRequestDto;
import com.hihi.square.domain.user.dto.request.UserFindIdRequestDto;
import com.hihi.square.domain.user.dto.response.UserLoginResponseDto;
import com.hihi.square.domain.user.entity.User;
import com.hihi.square.domain.user.repository.CustomerRepository;
import com.hihi.square.domain.user.repository.UserRepository;
import com.hihi.square.global.jwt.JwtService;
import com.hihi.square.global.s3.S3Service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

import javax.persistence.EntityManager;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional
public class UserService {

	private final UserRepository userRepository;
	private final PasswordEncoder passwordEncoder;
	private final JwtService jwtService;
	private final S3Service s3Service;

	private final CustomerRepository customerRepository;
	public boolean validateDuplicateUid(String uid) {

		Optional<User> user = userRepository.findByUid(uid);
		return user.isPresent();

	}

	public boolean validateDuplicateNickname(String nickname) {
		Optional<User> user = userRepository.findByNickname(nickname);
		return user.isPresent();
	}
	public boolean validateDuplicateEmail(String email) {
		Optional<User> user = userRepository.findByEmail(email);
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
				.userUid(user.getUid())
				.usrId(user.getUsrId())
				.userNickname(user.getNickname())
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

	@Transactional
	public void logout(String uid) {
		User user = userRepository.findByUid(uid).get();
		user.resetRefreshToken();
	}

	public Optional<User> findByUsrId(Integer usrId) {
		return userRepository.findByUsrId(usrId);
	}

	@Transactional
	public void updateUserInfo(String uid, CustomerUpdateRequestDto request) {
		User user = userRepository.findByUid(uid).get();
		user.updateUserInfo(request.getNickname(), request.getPhone());
		userRepository.save(user);
	}

	@Transactional
	public void updateUserProfile(User user, ImageRequestDto image) {
		ImageFileThumbDto result = s3Service.uploadFile("userProfile",user.getUsrId(),image);
		user.updateUserProfile(result.getUrl(), result.getThumbnail());
		userRepository.save(user);
	}

	@Transactional
	public void deleteUserProfile(User user) {
		user.updateUserProfile(null, null);
		userRepository.save(user);
	}


}
