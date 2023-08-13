package com.hihi.square.domain.menu.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import com.hihi.square.domain.menu.entity.MenuOptionCategory;

public interface MenuOptionCategoryRepository extends JpaRepository<MenuOptionCategory, Long> {
	@Transactional
	@Modifying
	@Query(value = "select * from menu_option_category where usr_id = :userId", nativeQuery = true)
	List<MenuOptionCategory> findAllByUserId(@Param("userId") Integer userId);

	@Transactional
	@Modifying
	@Query(value = "select * from menu_option_category where men_id=:menId", nativeQuery = true)
	List<MenuOptionCategory> findAllByMenuId(@Param("menId") Long menId);

	@Transactional
	@Modifying
	@Query(value = "update menu_option_category set sequence = :sequence  where moc_id = :mocId", nativeQuery = true)
	void updateMenuOptionCategoryList(@Param("mocId") Long mocId,
		@Param("sequence") Integer sequence);

	@Transactional
	@Query(value = "select * from menu_option_category where men_id = :menId and name = :name", nativeQuery = true)
	Optional<MenuOptionCategory> findByName(@Param("menId") Long menId, @Param("name") String name);

	@Transactional
	@Modifying
	@Query(value = "update menu_option set moc_id = :updateMocId where moc_id = :mocId", nativeQuery = true)
	void updateOptionCategoryToZero(@Param("mocId") Long mocId, @Param("updateMocId") Long updateMocId);
}
