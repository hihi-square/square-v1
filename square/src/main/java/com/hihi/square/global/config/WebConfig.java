package com.hihi.square.global.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebMvc
public class WebConfig implements WebMvcConfigurer {
	// @Override
	// public void addInterceptors(InterceptorRegistry registry) {
	// 	registry.addInterceptor(new StoreInterceptor()) // LogInterceptor 등록
	// 		.order(1)    // 적용할 필터 순서 설정
	// 		.addPathPatterns("/store/**")
	// 		.excludePathPatterns("/error"); // 인터셉터에서 제외할 패턴
	// }

	@Override
	public void addCorsMappings(CorsRegistry registry) {
		registry.addMapping("/**")
			.allowedOrigins("http://localhost:3000", "https://localhost:3000", "http://i9b208.p.ssafy.io:80",
				"http://i9b208.p.ssafy.io", "https://i9b208.p.ssafy.io:443", "https://i9b208.p.ssafy.io")
			//			.allowedOrigins("*")
			.allowedMethods("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS")
			.allowedHeaders("*")
			.maxAge(3600);
	}

	@Bean
	public CommonsMultipartResolver multipartResolver() {
		CommonsMultipartResolver commonsMultipartResolver = new CommonsMultipartResolver();
		commonsMultipartResolver.setDefaultEncoding("UTF-8");
		commonsMultipartResolver.setMaxUploadSizePerFile(50 * 1024 * 1024);
		return commonsMultipartResolver;
	}
}
