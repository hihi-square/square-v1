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

	//메뉴, 회원 ID로 조회
	@Transactional
	@Modifying
	@Query(value = "select * from menu_option where usr_id = :userId and men_id=:menuId", nativeQuery = true)
	List<MenuOption> findAllById(@Param("userId") Integer userId, @Param("menuId") Long menuId);

	@Transactional
	@Modifying
	@Query(value = "update menu_option set status=:status where meo_id=:meoId", nativeQuery = true)
	void updateStatus(@Param("meoId") Long meoId, @Param("status") String status);

	@Transactional
	@Modifying
	@Query(value = "update menu_option set moc_id=:mocId, status=:status, sequence=:sequence  where meo_id = :meoId", nativeQuery = true)
	void updateMenuOptionList(@Param("meoId") Long meoId,
		@Param("mocId") Long mocId, @Param("status") String status, @Param("sequence") Integer sequence);
}
