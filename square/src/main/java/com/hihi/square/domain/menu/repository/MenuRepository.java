package com.hihi.square.domain.menu.repository;

import com.hihi.square.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import com.hihi.square.domain.menu.entity.Menu;

import java.util.List;
import java.util.Optional;

public interface MenuRepository extends JpaRepository<Menu, Long> {
	@Transactional
	@Modifying
	@Query(value = "update menu set mec_id= :categoryId, status = :status, sequence = :sequence  where men_id = :menuId", nativeQuery = true)
	void updateMenuList(@Param("menuId") Long menuId, @Param("categoryId") Long categoryId,
		@Param("status") Integer status,
		@Param("sequence") Integer sequence);

	List<Menu> findByUserAndPopularityIsTrue(User user);
}
