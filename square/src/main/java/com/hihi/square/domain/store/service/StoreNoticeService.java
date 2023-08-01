package com.hihi.square.domain.store.service;


import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hihi.square.domain.store.dto.request.StoreNoticeWriteRequestDto;
import com.hihi.square.domain.store.entity.Notice;
import com.hihi.square.domain.store.entity.Store;
import com.hihi.square.domain.store.repository.StoreNoticeRepository;
import com.hihi.square.global.dto.request.ImageRequestDto;
import com.hihi.square.global.entity.Image;
import com.hihi.square.global.respository.ImageRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class StoreNoticeService {
	private final StoreNoticeRepository storeNoticeRepository;
	private final ImageRepository imageRepository;

	@Transactional
	public void write(Store store, StoreNoticeWriteRequestDto request) {
		Notice notice = Notice.builder()
			.emdAddress(store.getEmdAddress())
			.content(request.getContent())
			.store(store)
			.build();
		storeNoticeRepository.save(notice);
		for(ImageRequestDto image : request.getImages()){
			imageRepository.save(Image.builder()
				.url(image.getUrl())
				.order(image.getOrder())
				.type("SNO")
				.connectedId(notice.getSnoId())
				.thumbnail(image.getThumbnail())
				.build());

		}
	}
}
