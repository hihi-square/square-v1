package com.hihi.square.global.config;

import org.springframework.beans.factory.annotation.Configurable;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {
	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		http
			// rest api만을 고려하여 기본설정 해제
			.httpBasic().disable()
			.cors().and()
			// 서버에 인증정보를 저장하지 않기 때문에 csrf를 사용하지 않음
			.csrf(AbstractHttpConfigurer::disable)
			// 기본 로그인페이지 없애기
			.formLogin().disable()
			// session 기반의 인증을 하지 않기 때문에 stateless로 바꿔줌
			.sessionManagement((sessionManagement) ->
				sessionManagement.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
			)
			// 토큰을 활용하는 경우 모든 요청에 대해 인가에 대해서 적용
			.authorizeHttpRequests((authorizeRequests) ->{
				authorizeRequests.anyRequest().permitAll();
			})



			// spring security jwt filter load
			// .addFilterBefore(jwtAuthenticationFilter, BasicAuthenticationFilter.class)

		;

		return http.build();
	}

}
