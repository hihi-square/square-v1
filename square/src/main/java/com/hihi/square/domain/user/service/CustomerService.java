package com.hihi.square.domain.user.service;

import com.hihi.square.domain.user.entity.Customer;
import com.hihi.square.domain.user.repository.CustomerRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional
public class CustomerService {

	private final CustomerRepository customerRepository;
	private final PasswordEncoder passwordEncoder;

	@Transactional
	public void save(Customer customer){
		customer.passwordEncode(passwordEncoder);
		customerRepository.save(customer);
	}

}
