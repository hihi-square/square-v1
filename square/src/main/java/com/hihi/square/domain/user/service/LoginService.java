package com.hihi.square.domain.user.service;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.hihi.square.domain.user.entity.User;
import com.hihi.square.domain.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class LoginService implements UserDetailsService {

	private final UserRepository userRepository;

	@Override
	public UserDetails loadUserByUsername(String uid) throws UsernameNotFoundException {
		User user = userRepository.findByUid(uid)
			.orElseThrow(() -> new UsernameNotFoundException("NOT_EXISTS_USER"));

		// List<GrantedAuthority> authorities = new ArrayList<>();
		// authorities.add(new SimpleGrantedAuthority(user.getDecriminatorValue()));

		return org.springframework.security.core.userdetails.User.builder()
			.username(user.getUid())
			.password(user.getPassword())
			// .authorities(authorities)
			.roles(user.getDecriminatorValue())
			.build();
	}

}