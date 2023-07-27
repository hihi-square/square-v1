package com.hihi.square.menu.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hihi.square.menu.entity.MenuEntity;
import com.hihi.square.menu.repository.MenuRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class MenuService {
	private final MenuRepository mr;

	@Transactional
	public void saveMenu(MenuEntity menu) {
		mr.save(menu);
	}

	public MenuEntity findOne(Long menuId) {
		return mr.findOne(menuId);
	}

	public List<MenuEntity> findAll() {
		return mr.findAll();
	}

}
