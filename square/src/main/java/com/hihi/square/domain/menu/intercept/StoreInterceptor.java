package com.hihi.square.domain.menu.intercept;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j
public class StoreInterceptor implements HandlerInterceptor {

	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
		throws Exception {
		// 사용자 인증 정보를 가져옴
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

		log.info("authentication : {}", authentication.getPrincipal());
		// 사용자 인증 정보가 존재하고 User 객체인 경우 userType 확인
		// if (authentication != null) {
		// 	String uid = authentication.getName();
		// 	User user = userService.findByUid(uid).get();
		// 	if (!(user instanceof Store)) {
		// 		// User 객체가 STORE가 아닌 경우, 요청을 중단하고 에러 응답을 반환
		// 		response.setStatus(HttpServletResponse.SC_FORBIDDEN);
		// 		return false;
		// 	}
		// }
		if (authentication != null && authentication.getPrincipal() instanceof User) {
			User user = (User)authentication.getPrincipal();
			log.info("user : {}", user.getAuthorities());

			for (GrantedAuthority authority : user.getAuthorities()) {
				if (authority.getAuthority().equals("ROLE_UA02")) {
					return true;
				}
			}
			// User 객체가 STORE(UA02)이 아닌 경우, 요청을 중단하고 에러 응답을 반환
			response.setStatus(HttpServletResponse.SC_FORBIDDEN);
			return false;
			// }
		} else {
			// 사용자 인증 정보가 없거나 User 객체가 아닌 경우, 요청을 중단하고 에러 응답을 반환
			response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
			return false;
		}

		// return true; // 계속 진행 (다음 인터셉터 또는 컨트롤러 실행)
		// return false; // 중단 (요청 처리 중단, 에러 응답 등 처리 가능)
		// return true;
	}
}
