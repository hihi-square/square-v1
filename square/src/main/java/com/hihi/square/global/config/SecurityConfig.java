package com.hihi.square.global.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.hihi.square.domain.user.repository.UserRepository;
import com.hihi.square.domain.user.service.LoginService;
import com.hihi.square.global.jwt.JwtService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Slf4j
@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

	private final LoginService loginService;
	private final JwtService jwtService;
	private final UserRepository userRepository;
	private final ObjectMapper objectMapper;

	private final String[] allowedUrls = {
			"/store", // 가게 회원 정보 등록
			"/store/business-license/*", // 사업자등록번호 중복확인
			"/user/id/*", // 회원 아이디 중복확인
			"/user/login", // 회원 로그인
			"/user/find/**", // 회원 아이디/비밀번호 찾기
			"/user" // 소비자 회원가입

	};	// 로그인 안해도 되는 URL들

	// BCryptPasswordEncoder는 Spring Security에서 제공하는 비밀번호 암호화 객체입니다.
	// Service에서 비밀번호를 암호화할 수 있도록 Bean으로 등록합니다.
	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		//				.authorizeHttpRequests(requests -> requests.request("/*").permitAll().anyRequest().authenticated())

		http
			// rest api만을 고려하여 기본설정 해제
			.httpBasic().disable()
			// 서버에 인증정보를 저장하지 않기 때문에 csrf를 사용하지 않음
			.csrf().disable()
			.cors().and()
			// session 기반의 인증을 하지 않기 때문에 stateless로 바꿔줌
			.sessionManagement((sessionManagement) ->
					sessionManagement.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
			)
			// 기본 로그인페이지 없애기
			.formLogin().disable()
			.authorizeRequests()
			.antMatchers("/user/login", "/user", "/store").permitAll()
			// 위 3가지(로그인, 구매자/가게 회원가입)을 제외한 POST 요청을 막아둠
			.antMatchers(HttpMethod.POST, "/**").authenticated()
			// 토큰을 활용하는 경우 모든 요청에 대해 인가에 대해서 적용
			// .authorizeHttpRequests(requests ->
			// 	requests.anyRequest().permitAll()
			// )
//			.and()

		;

//		http.addFilterAfter(customJsonUsernamePasswordAuthenticationFilter(), LogoutFilter.class);
//		http.addFilterBefore(jwtAuthenticationProcessingFilter(), CustomJsonUsernamePasswordAuthenticationFilter.class);

		return http.build();
	}

//	/**
//	 * AuthenticationManager 설정 후 등록
//	 * PasswordEncoder를 사용하는 AuthenticationProvider 지정 (PasswordEncoder는 위에서 등록한 PasswordEncoder 사용)
//	 * FormLogin(기존 스프링 시큐리티 로그인)과 동일하게 DaoAuthenticationProvider 사용
//	 * UserDetailsService는 커스텀 LoginService로 등록
//	 * 또한, FormLogin과 동일하게 AuthenticationManager로는 구현체인 ProviderManager 사용(return ProviderManager)
//	 *
//	 */
//	@Bean
//	public AuthenticationManager authenticationManager() {
//		DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
//		provider.setPasswordEncoder(passwordEncoder());
//		provider.setUserDetailsService(loginService);
//		return new ProviderManager(provider);
//	}
//
//	/**
//	 * 로그인 성공 시 호출되는 LoginSuccessJWTProviderHandler 빈 등록
//	 */
//	@Bean
//	public LogInSuccessHandler loginSuccessHandler() {
//		return new LogInSuccessHandler(jwtService, userRepository);
//	}
//
//	/**
//	 * 로그인 실패 시 호출되는 LoginFailureHandler 빈 등록
//	 */
//	@Bean
//	public LoginFailHandler loginFailureHandler() {
//		return new LoginFailHandler();
//	}
//
//	/**
//	 * CustomJsonUsernamePasswordAuthenticationFilter 빈 등록
//	 * 커스텀 필터를 사용하기 위해 만든 커스텀 필터를 Bean으로 등록
//	 * setAuthenticationManager(authenticationManager())로 위에서 등록한 AuthenticationManager(ProviderManager) 설정
//	 * 로그인 성공 시 호출할 handler, 실패 시 호출할 handler로 위에서 등록한 handler 설정
//	 */
//	@Bean
//	public CustomJsonUsernamePasswordAuthenticationFilter customJsonUsernamePasswordAuthenticationFilter() {
//		CustomJsonUsernamePasswordAuthenticationFilter customJsonUsernamePasswordLoginFilter
//			= new CustomJsonUsernamePasswordAuthenticationFilter(objectMapper);
//		customJsonUsernamePasswordLoginFilter.setAuthenticationManager(authenticationManager());
//		customJsonUsernamePasswordLoginFilter.setAuthenticationSuccessHandler(loginSuccessHandler());
//		customJsonUsernamePasswordLoginFilter.setAuthenticationFailureHandler(loginFailureHandler());
//		return customJsonUsernamePasswordLoginFilter;
//	}
//
//	@Bean
//	public JwtAuthenticationProcessingFilter jwtAuthenticationProcessingFilter() {
//		JwtAuthenticationProcessingFilter jwtAuthenticationFilter = new JwtAuthenticationProcessingFilter(jwtService, userRepository);
//		return jwtAuthenticationFilter;
//	}
//
//
//	@Bean
//	public CorsConfigurationSource corsConfigurationSource() {
//		CorsConfiguration corsConfiguration = new CorsConfiguration();
//
//		corsConfiguration.addAllowedOriginPattern("*");
//		corsConfiguration.addAllowedHeader("*");
//		corsConfiguration.addAllowedMethod("*");
//		corsConfiguration.setAllowCredentials(true);
//		corsConfiguration.setAllowedMethods(Arrays.asList("HEAD","POST","GET","DELETE","PUT"));
//
//		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//		source.registerCorsConfiguration("/**",corsConfiguration);
//
//		return source;
//	}

}
