package com.hihi.square.domain.store.service;


import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hihi.square.domain.store.dto.request.StoreNoticeWriteRequestDto;
import com.hihi.square.domain.store.dto.response.StoreNoticeResponseDto;
import com.hihi.square.domain.store.entity.Notice;
import com.hihi.square.domain.store.entity.Store;
import com.hihi.square.domain.store.repository.StoreNoticeRepository;
import com.hihi.square.domain.image.dto.request.ImageRequestDto;
import com.hihi.square.domain.image.dto.response.ImageResponseDto;
import com.hihi.square.domain.image.entity.Image;
import com.hihi.square.domain.image.respository.ImageRepository;

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

	public List<StoreNoticeResponseDto> getNoticeList(Store store) {
		List<StoreNoticeResponseDto> result = new ArrayList<>();
		List<Notice> notices = storeNoticeRepository.findAllByStoreOrderByCreatedAt(store);

		for(Notice notice : notices){
			List<Image> images = imageRepository.findAllByTypeAndConnectedId("SNO", notice.getSnoId());
			List<ImageResponseDto> imageResponseDtoList = new ArrayList<>();
			for(Image img : images){
				imageResponseDtoList.add(
					ImageResponseDto.builder()
						.imgId(img.getImgId())
						.url(img.getUrl())
						.order(img.getOrder())
						.type(img.getType())
						.connectedId(img.getConnectedId())
						.thumbnail(img.getThumbnail())
						.build()
				);
			}
			result.add(StoreNoticeResponseDto.builder()
					.snoId(notice.getSnoId())
					.content(notice.getContent())
					.createdAt(notice.getCreatedAt())
					.modifiedAt(notice.getModifiedAt())
					.images(
						imageResponseDtoList
					).build());
		}

		return result;
	}

	public Optional<Notice> getNotice(Integer snoId) {
		return storeNoticeRepository.findBySnoId(snoId);

	}
}
