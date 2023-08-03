package com.hihi.square.domain.store.service;


import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.hihi.square.domain.image.dto.ImageFileThumbDto;
import com.hihi.square.domain.store.dto.request.StoreNoticeUpdateRequestDto;
import com.hihi.square.domain.store.dto.request.StoreNoticeWriteRequestDto;
import com.hihi.square.domain.store.dto.response.StoreNoticeResponseDto;
import com.hihi.square.domain.store.entity.Notice;
import com.hihi.square.domain.store.entity.Store;
import com.hihi.square.domain.store.repository.StoreNoticeRepository;
import com.hihi.square.domain.image.dto.request.ImageRequestDto;
import com.hihi.square.domain.image.dto.response.ImageResponseDto;
import com.hihi.square.domain.image.entity.Image;
import com.hihi.square.domain.image.respository.ImageRepository;
import com.hihi.square.global.s3.S3Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class StoreNoticeService {
	private final StoreNoticeRepository storeNoticeRepository;
	private final ImageRepository imageRepository;
	private final S3Service s3Service;

	@Transactional
	public void write(Store store, StoreNoticeWriteRequestDto request, List<ImageRequestDto> files) {
		Notice notice = Notice.builder()
			.emdAddress(store.getEmdAddress())
			.content(request.getContent())
			.state(request.getState())
			.store(store)
			.build();
		storeNoticeRepository.save(notice);
		List<ImageFileThumbDto> images = s3Service.uploadFiles("storeNotice", store.getUsrId(),files);
		for(int order=0;order<images.size();order++){
			imageRepository.save(Image.builder()
				.url(images.get(order).getUrl())
				.order(order+1)
				.type("SNO")
				.connectedId(notice.getSnoId())
				.thumbnail(images.get(order).getUrl())
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
					.state(notice.getState())
					.images(
						imageResponseDtoList
					).build());
		}

		return result;
	}

	public Optional<Notice> getNotice(Integer snoId) {
		return storeNoticeRepository.findBySnoId(snoId);

	}

	@Transactional
	public void updateNotice(Notice notice, StoreNoticeUpdateRequestDto request) {
		notice.updateContent(request.getContent());
		notice.updateState(request.getState());
		storeNoticeRepository.save(notice);
		imageRepository.deleteByTypeAndConnectedId("SNO", notice.getSnoId());
		for(ImageRequestDto image : request.getImages()){
			imageRepository.save(Image.builder()
				// .url(image.getUrl())
				.order(1)
				.type("SNO")
				.connectedId(notice.getSnoId())
				// .thumbnail(image.getThumbnail())
				.build());
		}
	}

	@Transactional
	public void deleteNotice(Notice notice) {
		imageRepository.deleteByTypeAndConnectedId("SNO", notice.getSnoId());
		storeNoticeRepository.delete(notice);
	}

	@Transactional
	public void updateNoticePrivate(Notice notice) {
		notice.updateState("ST06");
		storeNoticeRepository.save(notice);
	}

	@Transactional
	public void updateNoticePublic(Notice notice) {
		notice.updateState("ST01");
		storeNoticeRepository.save(notice);
	}
}
