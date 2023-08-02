package com.hihi.square.domain.menu.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hihi.square.domain.menu.entity.MenuCategory;

public interface MenuCategoryRepository extends JpaRepository<MenuCategory, Long> {
}
