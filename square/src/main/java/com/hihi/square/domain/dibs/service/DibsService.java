package com.hihi.square.domain.dibs.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.hihi.square.domain.menu.entity.Menu;
import com.hihi.square.domain.menu.repository.MenuRepository;
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
	private final MenuRepository menuRepository;

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

		List<DibsResponseDto> closedStoreList = new ArrayList<>();

		List<DibsResponseDto> result = new ArrayList<>();
		for (Dibs d : dibsList) {
			Store store = d.getStore();

			List<Menu> menuList = menuRepository.findByUserAndPopularityIsTrue((User)store);

			if(menuList.size() == 0) {
				menuList = menuRepository.findAllByUserId(store.getUsrId());
			}

			// 인기메뉴가 3개 이상이면 3개만 가져오도록 함
			int size = menuList.size() >= 3 ? 3 : menuList.size();

			String menuName = "";
			for (int i = 0; i < size; i++) {
				if (i == size - 1) {
					menuName += menuList.get(i).getName();
				} else {
					menuName += menuList.get(i).getName() + ", ";
				}
			}
			DibsResponseDto dto = DibsResponseDto.builder()
				.dibId(d.getDibId())
				.cusId(customer.getUsrId())
				.stoId(store.getUsrId())
				.storeName(store.getStoreName())
				.content(store.getContent())
				.storeAddress(store.getEmdAddress().getFullName() + " " + store.getAddress())
				.mainMenu(menuName)
				.logo(store.getLogo())
				.isOpened(store.getIsOpened())
				.latitude(store.getLatitude())
				.longitude(store.getLongitude())
				.build();

			if(store.getIsOpened()) {
				result.add(dto);
			} else closedStoreList.add(dto);
		}
		result.addAll(closedStoreList);
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
