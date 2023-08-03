package com.hihi.square.domain.menu.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hihi.square.domain.menu.entity.MenuOption;

public interface MenuOptionRepository extends JpaRepository<MenuOption, Long> {
}
