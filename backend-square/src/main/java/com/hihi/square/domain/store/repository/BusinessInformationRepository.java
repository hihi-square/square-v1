package com.hihi.square.domain.store.repository;

import com.hihi.square.domain.store.entity.BusinessInformation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BusinessInformationRepository extends JpaRepository<BusinessInformation, Integer> {
    public Optional<BusinessInformation> findByCompanyRegistrationNumber(Integer number);

}
