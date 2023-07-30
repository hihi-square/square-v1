package com.hihi.square.domain.user.service;

import com.hihi.square.domain.user.entity.User;
import com.hihi.square.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class LoginService implements UserDetailsService {

	private final UserRepository userRepository;

	@Override
	public UserDetails loadUserByUsername(String uid) throws UsernameNotFoundException {
		User user = userRepository.findByUid(uid)
			.orElseThrow(() -> new UsernameNotFoundException("NOT_EXISTS_USER"));

		return org.springframework.security.core.userdetails.User.builder()
			.username(user.getUid())
			.password(user.getPassword())
			.roles(user.getDecriminatorValue())
			.build();
	}



}