package com.hihi.square.domain.menu.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import com.hihi.square.domain.menu.entity.MenuOption;

public interface MenuOptionRepository extends JpaRepository<MenuOption, Long> {
	@Transactional
	@Modifying
	@Query(value = "select * from menu_option where usr_id = :userId", nativeQuery = true)
	List<MenuOption> findAllByUserId(@Param("userId") Integer userId);

	@Transactional
	@Modifying
	@Query(value = "update menu_option set sequence = :sequence  where meo_id = :optionId", nativeQuery = true)
	void updateMenuOptionList(@Param("optionId") Long optionId,
		@Param("sequence") Integer sequence);
}
