package com.hihi.square.domain.user.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.Queue;

import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hihi.square.domain.user.entity.AddressConnect;
import com.hihi.square.domain.user.entity.EmdAddress;
import com.hihi.square.domain.user.repository.AddressConnectRepository;
import com.hihi.square.domain.user.repository.EmdAddressRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EmdAddressService {

	private final EmdAddressRepository emdAddressRepository;
	private final AddressConnectRepository addressConnectRepository;

	@Transactional
	public List<EmdAddress> getEmdAddressWithDepth(Integer firstEmdAddress, Integer depth) {
		List<EmdAddress> result = new ArrayList<>();
		if (firstEmdAddress <1230 || firstEmdAddress > 1406 || depth == 1) {
			result.add(emdAddressRepository.findById(firstEmdAddress).get());
			return result;
		}
		List<Integer> resultId = new ArrayList<>();
		resultId.add(firstEmdAddress);
		int[] visited = new int[1410];
		visited[firstEmdAddress] = 1;
		Queue<Integer> queue = new LinkedList<>();
		queue.add(firstEmdAddress);
		while(!queue.isEmpty()){
			Integer now = queue.poll();
			List<AddressConnect> list = addressConnectRepository.findAllByFromId(now);
			for(AddressConnect li : list){
				Integer i = li.getToId();
				if (visited[i] == 0){ // 아직 방문 안함
					visited[i] = visited[now] + 1;
					resultId.add(i);
					if (visited[i] < depth)
						queue.add(i);
				}
			}
		}
		System.out.println(resultId);
		for(Integer id : resultId){
			result.add(emdAddressRepository.findById(id).get());
		}
		return result;
	}

	public Optional<EmdAddress> findByAdmCode(Long admCode) {
		return emdAddressRepository.findByAdmCode(admCode);
	}

	public Optional<EmdAddress> findById(Integer emdId) {
		return emdAddressRepository.findById(emdId);
	}
}
