package com.hihi.square.domain.menu.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hihi.square.domain.menu.entity.Menu;
import com.hihi.square.domain.menu.repository.MenuRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class MenuService {
	private final MenuRepository mr;

	@Transactional
	public void saveMenu(Menu menu) {
		mr.save(menu);
	}

	public Menu findOne(Long menuId) {
		return mr.findOne(menuId);
	}

	public List<Menu> findAll() {
		return mr.findAll();
	}

	@Transactional
	public void update(Long id, String name) {
		Menu menu = mr.findOne(id);
		menu.setName(name);
	}
}
