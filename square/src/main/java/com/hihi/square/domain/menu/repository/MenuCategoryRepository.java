package com.hihi.square.domain.menu.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import com.hihi.square.domain.menu.entity.MenuCategory;
import com.hihi.square.domain.user.entity.User;

public interface MenuCategoryRepository extends JpaRepository<MenuCategory, Long> {
	@Transactional
	@Modifying
	@Query(value = "select * from menu_category where usr_id = :userId", nativeQuery = true)
	List<MenuCategory> findAllByUserId(@Param("userId") Integer userId);

	@Transactional
	@Modifying
	@Query(value = "update menu_category set sequence = :sequence  where mec_id = :categoryId", nativeQuery = true)
	void updateMenuCategoryList(@Param("categoryId") Long categoryId,
		@Param("sequence") Integer sequence);

	@Transactional
	@Query(value = "select * from menu_category where usr_id = :userId and name = :name", nativeQuery = true)
	Optional<MenuCategory> findByName(@Param("userId") Integer userId, @Param("name") String name);

	@Transactional
	@Modifying
	@Query(value = "update menu set mec_id = :updateMecId where mec_id = :mecId", nativeQuery = true)
	void updateMenuCategoryToZero(@Param("mecId") Long mecId, @Param("updateMecId") Long updateMecId);

	List<MenuCategory> findByUserOrderBySequence(User user);
}
