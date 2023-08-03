package com.hihi.square.domain.menu.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import com.hihi.square.domain.menu.entity.Menu;
import com.hihi.square.domain.menu.entity.MenuStatus;

public interface MenuRepository extends JpaRepository<Menu, Long> {
	@Transactional
	@Modifying
	@Query(value = "update menu set status = :status, sequence = :sequence  where men_id = :menuId", nativeQuery = true)
	void updateMenuList(@Param("menuId") Long menuId, @Param("status") MenuStatus status,
		@Param("sequence") Integer sequence);
}
