package com.hihi.square.domain.menu.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hihi.square.domain.menu.entity.Menu;

public interface MenuRepository extends JpaRepository<Menu, Long> {
}
