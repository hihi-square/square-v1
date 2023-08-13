package com.hihi.square.domain.user.service;

import com.hihi.square.domain.user.dto.request.CustomerUpdateRequestDto;
import com.hihi.square.domain.user.dto.request.UserFindIdRequestDto;
import com.hihi.square.domain.user.dto.response.UserInfoDto;
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

import java.time.LocalDateTime;
import java.util.Optional;

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

	@Transactional
	public void saveSocialUser(User user) {
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
		userRepository.updateRefreshToken(refreshToken, LocalDateTime.now(), user.getUid());
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
		user.updateUserInfo(request.getNickname(), request.getPhone(), request.getEmail());
		userRepository.save(user);
	}

	@Transactional
	public void updateUserProfile(User user, MultipartFile profile, MultipartFile thumb) {
		String profileUrl = s3Service.getFileUrl("userProfile", profile, false);
		String thumbUrl = s3Service.getFileUrl("userProfile", thumb, true);
		user.updateUserProfile(profileUrl, thumbUrl);
		userRepository.save(user);
	}

	@Transactional
	public void deleteUserProfile(User user) {
		user.updateUserProfile(null, null);
		userRepository.save(user);
	}
	public UserInfoDto getMyInfo(String uid) {
		User user = userRepository.findByUid(uid).get();
		return UserInfoDto.builder()
			.uid(user.getUid())
			.password(user.getPassword())
			.phone(user.getPhone())
			.nickname(user.getNickname())
			.name(user.getName())
			.email(user.getEmail())
			.marketingAgree(user.isMarketingAgree())
			.profile(user.getProfile())
			.build();
	}

	public Optional<User> findByNickname(String nickname) {
		return userRepository.findByNickname(nickname);
	}
}
