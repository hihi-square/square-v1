package com.hihi.square.domain.dibs.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.hihi.square.domain.dibs.dto.response.DibsResponseDto;
import com.hihi.square.domain.dibs.entity.Dibs;
import com.hihi.square.domain.dibs.respository.DibsRepository;
import com.hihi.square.domain.store.entity.Store;
import com.hihi.square.domain.user.entity.Customer;
import com.hihi.square.domain.user.entity.User;
import com.hihi.square.domain.user.service.UserService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DibsService {

	private final DibsRepository dibsRepository;
	private final UserService userService;

	public void dibStore(Customer customer, Store store) {
		dibsRepository.save(Dibs.builder().store(store).customer(customer).createdAt(LocalDateTime.now()).build());
	}

	public Optional<Dibs> getDib(Customer customer, Store store) {
		return dibsRepository.findByCustomerAndStore(customer, store);
	}

	public void dibCancel(Dibs dibs) {
		dibsRepository.delete(dibs);
	}

	public List<DibsResponseDto> getUserDibs(Customer customer) {
		List<Dibs> dibsList = dibsRepository.findByCustomer(customer);
		List<DibsResponseDto> result = new ArrayList<>();
		for (Dibs d : dibsList) {
			result.add(DibsResponseDto.builder()
				.dibId(d.getDibId())
				.usrId(d.getCustomer().getUsrId())
				.uid(d.getCustomer().getUid())
				.emdAddress(d.getStore().getEmdAddress())
				.address(d.getStore().getAddress())
				.storeName(d.getStore().getStoreName())
				.storePhone(d.getStore().getStorePhone())
				.build());
		}
		return result;
	}

	public List<User> getCustomerByStore(Store store) {
		List<Dibs> dibs = dibsRepository.findCustomerByStore(store);
		List<User> userList = new ArrayList<>();
		// log.info("userId : {}", store.getUsrId());

		for (Dibs dib : dibs) {
			Integer userId = dib.getCustomer().getUsrId();
			User user = userService.findByUsrId(userId).get();
			userList.add(user);
		}
		return userList;
	}
}
