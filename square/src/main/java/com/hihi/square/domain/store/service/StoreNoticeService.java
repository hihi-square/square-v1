package com.hihi.square.domain.store.service;


import com.hihi.square.domain.image.dto.request.ImageRequestDto;
import com.hihi.square.domain.image.dto.response.ImagesDetailResponseDto;
import com.hihi.square.domain.image.entity.Image;
import com.hihi.square.domain.image.respository.ImageRepository;
import com.hihi.square.domain.store.dto.request.StoreNoticeUpdateRequestDto;
import com.hihi.square.domain.store.dto.request.StoreNoticeWriteRequestDto;
import com.hihi.square.domain.store.dto.response.StoreNoticeResponseDto;
import com.hihi.square.domain.store.entity.Notice;
import com.hihi.square.domain.store.entity.Store;
import com.hihi.square.domain.store.repository.StoreNoticeRepository;
import com.hihi.square.domain.user.entity.EmdAddress;
import com.hihi.square.global.s3.S3Service;
import com.hihi.square.global.s3.dto.FileThumbDto;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.net.http.HttpResponse;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class StoreNoticeService {
	private final StoreNoticeRepository storeNoticeRepository;
	private final ImageRepository imageRepository;
	private final S3Service s3Service;

	@Transactional
	public void write(Store store, StoreNoticeWriteRequestDto request) {
		Notice notice = Notice.builder()
			.emdAddress(store.getEmdAddress())
				.content(request.getContent())
				.store(store)
				.state(request.getState())
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
		List<Notice> notices = storeNoticeRepository.findAllByStoreOrderByCreatedAtDesc(store);

		for(Notice notice : notices){
			List<Image> images = imageRepository.findAllByTypeAndConnectedIdOrderByOrder("SNO", notice.getSnoId());
			List<ImagesDetailResponseDto> imageResponseDtoList = new ArrayList<>();

			for(Image img : images){
				imageResponseDtoList.add(
					ImagesDetailResponseDto.builder()
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
		for(int i=0;i<request.getImages().size();i++){
			FileThumbDto image = request.getImages().get(i);
			imageRepository.save(Image.builder()
				.url(image.getUrl())
				.order(i+1)
				.type("SNO")
				.connectedId(notice.getSnoId())
				.thumbnail(image.getThumb())
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

	public List<StoreNoticeResponseDto> getNoticeListPublic(Store store) {
		List<StoreNoticeResponseDto> result = new ArrayList<>();
		List<Notice> notices = storeNoticeRepository.findAllByStoreAndPublicOrderByCreatedAtDesc(store);

		for(Notice notice : notices){
			List<Image> images = imageRepository.findAllByTypeAndConnectedIdOrderByOrder("SNO", notice.getSnoId());
			List<ImagesDetailResponseDto> imageResponseDtoList = new ArrayList<>();

			for(Image img : images){
				imageResponseDtoList.add(
					ImagesDetailResponseDto.builder()
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

	public List<StoreNoticeResponseDto> getNoticeByEmdList(List<EmdAddress> emdAddressList) {
		List<StoreNoticeResponseDto> result = new ArrayList<>();
		List<Notice> notices = storeNoticeRepository.findAllByEmdListOrderByCreatedAtDesc(emdAddressList);

		for(Notice notice : notices){
			List<Image> images = imageRepository.findAllByTypeAndConnectedIdOrderByOrder("SNO", notice.getSnoId());
			List<ImagesDetailResponseDto> imageResponseDtoList = new ArrayList<>();

			for(Image img : images){
				imageResponseDtoList.add(
					ImagesDetailResponseDto.builder()
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
}
