package com.hihi.square.domain.menu.repository;

import com.hihi.square.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import com.hihi.square.domain.menu.entity.MenuCategory;

import java.util.List;
import java.util.Optional;

public interface MenuCategoryRepository extends JpaRepository<MenuCategory, Long> {

    List<MenuCategory> findByUser(User user);

}
