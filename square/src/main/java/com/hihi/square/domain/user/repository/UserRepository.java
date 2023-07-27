package com.hihi.square.domain.user.repository;

import java.util.Optional;

import javax.persistence.EntityManager;

import org.springframework.stereotype.Repository;

import com.hihi.square.domain.user.entity.User;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class UserRepository {

	private final EntityManager em;

	public Optional<User> findByUid(String uid) {
		return em.createQuery("select u from User u where u.uid = :uid", User.class).setParameter("uid", uid).getResultList().stream().findAny();
	}

	public Optional<User> findByNickname(String nickname) {
		return em.createQuery("select u from User u where u.nickname = :nickname", User.class).setParameter("nickname", nickname).getResultList().stream().findAny();
	}

	public void save(User user) {
		em.persist(user);
	}
}
