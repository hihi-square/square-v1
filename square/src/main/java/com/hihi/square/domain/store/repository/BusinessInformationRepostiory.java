package com.hihi.square.domain.store.repository;

import java.util.Optional;

import javax.persistence.EntityManager;

import org.springframework.stereotype.Repository;

import com.hihi.square.domain.store.entity.BusinessInformation;
import com.hihi.square.domain.user.entity.User;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class BusinessInformationRepostiory {

	private final EntityManager em;
	public Optional<BusinessInformation> findByCompanyRegistrationNumber(Integer number) {
		return em.createQuery("select b from BusinessInformation b where b.companyRegistrationNumber = :number", BusinessInformation.class).setParameter("number", number).getResultList().stream().findAny();
	}

}
