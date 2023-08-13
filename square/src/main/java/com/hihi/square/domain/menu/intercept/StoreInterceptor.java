package com.hihi.square.domain.menu.intercept;

import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j
public class StoreInterceptor implements HandlerInterceptor {

	// @Override
	// public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
	// 	throws Exception {
	// if (request.getMethod().equals("POST")) {
	// 	// 사용자 인증 정보를 가져옴
	// 	Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
	//
	// 	log.info("authentication : {}", authentication.getPrincipal());
	// 	// 사용자 인증 정보가 존재하고 User 객체인 경우 userType 확인
	// 	if (authentication != null && authentication.getPrincipal() instanceof User) {
	// 		User user = (User)authentication.getPrincipal();
	// 		log.info("user : {}", user.getAuthorities());
	//
	// 		for (GrantedAuthority authority : user.getAuthorities()) {
	// 			if (authority.getAuthority().equals("ROLE_UA02")) {
	// 				return true;
	// 			}
	// 		}
	// 		// User 객체가 STORE(UA02)이 아닌 경우, 요청을 중단하고 에러 응답을 반환
	// 		response.setStatus(HttpServletResponse.SC_FORBIDDEN);
	// 		return false;
	// 		// }
	// 	} else {
	// 		// 사용자 인증 정보가 없거나 User 객체가 아닌 경우, 요청을 중단하고 에러 응답을 반환
	// 		response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
	// 		return false;
	// 	}
	// }
	// return false;
	// }
}
