package com.hihi.square.global.config;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;

@Slf4j
@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

	private final String[] allowedUrls = {
			"/store", // 가게 회원 정보 등록
			"/store/business-license/*", // 사업자등록번호 중복확인
			"/user/id/*", // 회원 아이디 중복확인
			"/user/login", // 회원 로그인
			"/user/find/**", // 회원 아이디/비밀번호 찾기
			"/user" // 소비자 회원가입

	};	// 로그인 안해도 되는 URL들

	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {


		http
//				.csrf().disable()
//				.authorizeHttpRequests(requests -> requests.request("/*").permitAll().anyRequest().authenticated())

			// rest api만을 고려하여 기본설정 해제
			.httpBasic().disable()
			.csrf().disable()
			// session 기반의 인증을 하지 않기 때문에 stateless로 바꿔줌
			.sessionManagement((sessionManagement) ->
					sessionManagement.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
			)
			// 서버에 인증정보를 저장하지 않기 때문에 csrf를 사용하지 않음
//			.csrf(AbstractHttpConfigurer::disable)
			// 기본 로그인페이지 없애기
			.formLogin().disable()
			// 토큰을 활용하는 경우 모든 요청에 대해 인가에 대해서 적용
			.authorizeHttpRequests(requests ->
				requests.anyRequest().permitAll()
			)

		;

		return http.build();
	}

}
