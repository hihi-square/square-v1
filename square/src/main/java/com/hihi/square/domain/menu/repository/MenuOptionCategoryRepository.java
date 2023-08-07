package com.hihi.square.domain.menu.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import com.hihi.square.domain.menu.entity.MenuOptionCategory;

public interface MenuOptionCategoryRepository extends JpaRepository<MenuOptionCategory, Long> {
	@Transactional
	@Modifying
	@Query(value = "select * from menu_option_category where userId=:userId and men_id=:menId", nativeQuery = true)
	List<MenuOptionCategory> findAllById(@Param("userId") Integer userId, @Param("menId") Long menId);

	@Transactional
	@Modifying
	@Query(value = "update menu_option_category set sequence = :sequence  where moc_id = :optionCategoryId", nativeQuery = true)
	void updateMenuOptionCategoryList(@Param("optionCategoryId") Long optionCategoryId,
		@Param("sequence") Integer sequence);
}
