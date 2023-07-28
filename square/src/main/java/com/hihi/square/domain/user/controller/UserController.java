package com.hihi.square.domain.user.controller;

import com.hihi.square.domain.user.dto.request.CustomerRegisterRequestDto;
import com.hihi.square.domain.user.dto.request.UserLoginRequestDto;
import com.hihi.square.domain.user.entity.Customer;
import com.hihi.square.domain.user.service.CustomerService;
import com.hihi.square.domain.user.service.UserService;
import com.hihi.square.global.common.CommonResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
@Slf4j
public class UserController {

	private final UserService userService;
	private final CustomerService customerService;

	//회원가입
	@PostMapping
	public ResponseEntity<CommonResponseDto> singup(@RequestBody @Valid CustomerRegisterRequestDto request) {
		Customer customer = request.toEntity();
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
	public ResponseEntity validateUid(@PathVariable String id){
		CommonResponseDto response = CommonResponseDto.builder()
				.statusCode(200)
				.message("INVALID")
				.build();
		if (userService.validateDuplicateUid(id)){
			return new ResponseEntity(response, HttpStatus.CONFLICT);
		} else {
			response.setMessage("VALID");
			return new ResponseEntity(response, HttpStatus.CONFLICT);
		}
	}

	@PostMapping("/login")
	public void login(@RequestBody @Valid UserLoginRequestDto request){


	}
}
