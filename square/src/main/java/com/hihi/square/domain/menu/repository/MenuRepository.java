package com.hihi.square.domain.menu.repository;

import java.util.List;

import javax.persistence.EntityManager;

import org.springframework.stereotype.Repository;

import com.hihi.square.domain.menu.entity.Menu;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Repository
@RequiredArgsConstructor
@Slf4j
public class MenuRepository {
	private final EntityManager em;

	//상품 등록, 수정
	public void save(Menu menu) {
		log.debug("repository 실행");
		if (menu.getId() == null) {
			log.info("Menu ", menu);
			em.persist(menu);
		} else {
			//update
			em.merge(menu);
		}
	}

	//상품 삭제 => 상태 삭제로 처리

	//상품 조회
	public Menu findOne(Long id) {
		return em.find(Menu.class, id);
	}

	public List<Menu> findAll() {
		return em.createQuery("select i from Menu m", Menu.class)
			.getResultList();
	}
}
