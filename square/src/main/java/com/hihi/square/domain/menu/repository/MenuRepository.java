package com.hihi.square.domain.menu.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import com.hihi.square.domain.menu.entity.Menu;
import com.hihi.square.domain.menu.entity.MenuCategory;
import com.hihi.square.domain.user.entity.User;

public interface MenuRepository extends JpaRepository<Menu, Long> {

	@Override
	Menu save(Menu menu);

	@Transactional
	@Modifying
	@Query(value = "select * from menu where usr_id = :userId", nativeQuery = true)
	List<Menu> findAllByUserId(@Param("userId") Integer userId);

	@Transactional
	@Modifying
	@Query(value = "update menu set mec_id= :categoryId, status = :status, sequence = :sequence  where men_id = :menuId", nativeQuery = true)
	void updateMenuList(@Param("menuId") Long menuId, @Param("categoryId") Long categoryId,
		@Param("status") String status,
		@Param("sequence") Integer sequence);

	@Transactional
	@Modifying
	@Query(value = "update menu set status=:status where men_id=:menId", nativeQuery = true)
	void updateStatus(@Param("menId") Long menId, @Param("status") String status);

	@Modifying
	@Query(value = "delete from menu_option where men_id = :menId", nativeQuery = true)
	void deleteOptionByMenuId(@Param("menId") Long menId);

	@Modifying
	@Query(value = "delete from menu_option_category where men_id = :menId", nativeQuery = true)
	void deleteOptionCategoryByMenuId(@Param("menId") Long menId);

	List<Menu> findByUserAndPopularityIsTrue(User user);

	List<Menu> findByMenuCategoryAndUserOrderBySequence(MenuCategory menuCategory, User user);
}
