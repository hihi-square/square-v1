package com.hihi.square.domain.menu.service;

import org.springframework.stereotype.Service;

import com.hihi.square.domain.menu.repository.MenuOptionRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MenuOptionService {
	private final MenuOptionRepository menuOptionRepository;
	//
	// public List<MenuOption> selectAll(Integer userId) {
	// 	menuOptionRepository.findAll();
	// }
}
