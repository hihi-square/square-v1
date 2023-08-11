package com.hihi.square.domain.user.controller;

import java.io.UnsupportedEncodingException;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.expression.spel.ast.NullLiteral;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hihi.square.domain.store.entity.Store;
import com.hihi.square.domain.user.dto.response.UserLoginResponseDto;
import com.hihi.square.domain.user.entity.Customer;
import com.hihi.square.domain.user.entity.User;
import com.hihi.square.domain.user.entity.UserSocialLoginType;
import com.hihi.square.domain.user.service.SocialLoginService;
import com.hihi.square.domain.user.service.UserService;
import com.hihi.square.global.jwt.JwtService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/user")
@CrossOrigin(origins = { "*" }, maxAge = 6000)
@RequiredArgsConstructor
public class SocialLoginController {

	private String FAIL = "fail";
	private final SocialLoginService socialLoginService;
	private final UserService userService;
	private final JwtService jwtService;


	@Transactional
	@GetMapping("/kakao")
	public ResponseEntity<?> kakaoLogin(@RequestParam(required = false) String code ){
		// 만약 사용자가 로그인 취소를 눌렀다면
		if (code == null) {
			return new ResponseEntity<String>("codeError",HttpStatus.BAD_REQUEST);
		}
		String accessToken = socialLoginService.kakaoGetToken(code);
		if (accessToken.isEmpty()){
			return new ResponseEntity<>("ACCESS_TOKEN_INVALID", HttpStatus.BAD_REQUEST);
		}
		Customer customer = socialLoginService.kakaoGetUserInfo(accessToken);
		return getSocialUserLogin(customer, UserSocialLoginType.KAKAO);
	}

	@Transactional
	@GetMapping("/naver")
	public ResponseEntity<?> naverLogin(@RequestParam(required = false) String code){
		// 만약 사용자가 로그인 취소를 눌렀다면
		if (code == null) {
			return new ResponseEntity<String>("codeError",HttpStatus.BAD_REQUEST);
		}
		String accessToken = socialLoginService.naverGetToken(code);
		if (accessToken.isEmpty()){
			return new ResponseEntity<>("ACCESS_TOKEN_INVALID", HttpStatus.BAD_REQUEST);
		}
		Customer customer = socialLoginService.naverGetUserInfo(accessToken);
		return getSocialUserLogin(customer, UserSocialLoginType.NAVER);
	}

	public ResponseEntity getSocialUserLogin(Customer customer, UserSocialLoginType social) {
		// 사용자 검증
		Optional<User> optionalUser = userService.findByUid(customer.getUid());
		User dbUser;
		// 만약 처음 로그인한거면
		if(optionalUser.isEmpty()) {
			userService.saveSocialUser(customer);
			dbUser = customer;
		} else {
			User option = optionalUser.get();
			if (option instanceof Store || !((Customer) option).getSocial().equals(social)) {
				return new ResponseEntity<String>("OTHER_LOGIN_METHOD", HttpStatus.BAD_REQUEST);
			}
			dbUser = (Customer) option;
		}

		String token = jwtService.createAccessToken(dbUser.getUid());
		String refreshToken = jwtService.createRefreshToken(dbUser.getUid());
		// 로그인
		UserLoginResponseDto response = UserLoginResponseDto.builder()
			.statusCode(200)
			.message("SUCCESS")
			.accessToken(token)
			.refreshToken(refreshToken)
			.userUid(dbUser.getUid())
			.usrId(dbUser.getUsrId())
			.userNickname(dbUser.getNickname())
			.build();

		dbUser.updateRefreshToken(refreshToken);
		userService.saveSocialUser(dbUser);
		return new ResponseEntity<>(response, HttpStatus.OK);
	}

}
