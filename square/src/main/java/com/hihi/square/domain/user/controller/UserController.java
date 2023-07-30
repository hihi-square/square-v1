package com.hihi.square.domain.user.controller;

import com.hihi.square.domain.user.dto.request.CustomerRegisterRequestDto;
import com.hihi.square.domain.user.dto.request.UserFindIdRequestDto;
import com.hihi.square.domain.user.dto.request.UserLoginRequestDto;
import com.hihi.square.domain.user.dto.response.UserFindIdResponseDto;
import com.hihi.square.domain.user.dto.response.UserLoginResponseDto;
import com.hihi.square.domain.user.entity.Customer;
import com.hihi.square.domain.user.entity.User;
import com.hihi.square.domain.user.entity.UserSocialLoginType;
import com.hihi.square.domain.user.service.CustomerService;
import com.hihi.square.domain.user.service.UserService;
import com.hihi.square.global.common.CommonResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Optional;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
@Slf4j
public class UserController {

	private final UserService userService;
	private final CustomerService customerService;
	private final PasswordEncoder passwordEncoder;

	//회원가입
	@PostMapping
	public ResponseEntity<CommonResponseDto> singup(@RequestBody @Valid CustomerRegisterRequestDto request) {
		Customer customer =  request.toEntity();
		CommonResponseDto response = CommonResponseDto.builder()
				.statusCode(409)
				.message("ALREADY_EXISTS_UID")
				.build();
		//아이디 중복 체크
		if (userService.validateDuplicateUid(customer.getUid())){
			return new ResponseEntity<>(response, HttpStatus.CONFLICT);
		}
		//닉네임 중복 체크
		if (userService.validateDuplicateNickname(customer.getNickname())) {
			response.setMessage("ALREADY_EXISTS_NICKNAME");
			return new ResponseEntity<>(response, HttpStatus.CONFLICT);
		}
		//저장
		customerService.save(customer);
		response.setStatusCode(201);
		response.setMessage("SIGNUP_SUCCESS");
		return new ResponseEntity<>(response, HttpStatus.CREATED);
	}

	@GetMapping("/id/{id}")
	public ResponseEntity<CommonResponseDto> validateUid(@PathVariable String id){
		CommonResponseDto response = CommonResponseDto.builder()
				.statusCode(200)
				.message("INVALID")
				.build();
		if (userService.validateDuplicateUid(id)){
			return new ResponseEntity<>(response, HttpStatus.CONFLICT);
		} else {
			response.setMessage("VALID");
			return new ResponseEntity<>(response, HttpStatus.CONFLICT);
		}
	}

	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody @Valid UserLoginRequestDto request){
		CommonResponseDto fResponse = CommonResponseDto.builder().statusCode(400).build();
		Optional<User> optionalUser =userService.findByUid(request.getUid());
		// 아이디 존재하지 않음
		if (!optionalUser.isPresent()){
			fResponse.setMessage("INVALID_UID");
			return new ResponseEntity<>(fResponse, HttpStatus.BAD_REQUEST);
		}
		// 비밀번호 틀림
		User user= optionalUser.get();
		if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
			fResponse.setMessage("INVALID_PASSWORD");
			return new ResponseEntity<>(fResponse, HttpStatus.BAD_REQUEST);
		}
		// 접근 권한이 없음 || // 로그인 방법 상이
		if(!request.getAuthenticate().toString().equals(user.getDecriminatorValue()) || ((user instanceof Customer) && !((Customer)user).getSocial().equals(
			UserSocialLoginType.US01))) {
			fResponse.setMessage("NOT_AUTHENTICATED");
			return new ResponseEntity<>(fResponse, HttpStatus.BAD_REQUEST);
		}
		// 로그인
		UserLoginResponseDto sResponse = userService.updateRefreshToken(user);

		return new ResponseEntity<>(sResponse, HttpStatus.OK);
	}
	
	
	// 아이디 찾기 
	@PostMapping("/find/id")
	public ResponseEntity<?> findUserId(@RequestBody @Valid UserFindIdRequestDto request) {
		Optional<User> optionalUser = userService.findUserId(request);
		if (!optionalUser.isPresent()){
			return new ResponseEntity<>(CommonResponseDto.builder().statusCode(400).message("INVALID").build(), HttpStatus.BAD_REQUEST);
		} else {
			return new ResponseEntity<>(UserFindIdResponseDto.builder().statusCode(200).message("VALID").uid(optionalUser.get().getUid()).build(), HttpStatus.OK);
		}
	}
}
