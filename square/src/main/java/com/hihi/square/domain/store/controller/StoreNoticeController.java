package com.hihi.square.domain.store.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.context.ApplicationEventPublisher;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hihi.square.domain.image.dto.response.ImagesDetailResponseDto;
import com.hihi.square.domain.image.entity.Image;
import com.hihi.square.domain.image.respository.ImageRepository;
import com.hihi.square.domain.store.dto.request.StoreNoticeUpdateRequestDto;
import com.hihi.square.domain.store.dto.request.StoreNoticeWriteRequestDto;
import com.hihi.square.domain.store.dto.response.StoreNoticeResponseDto;
import com.hihi.square.domain.store.dto.response.StoreNoticesResponseDto;
import com.hihi.square.domain.store.entity.Notice;
import com.hihi.square.domain.store.entity.Store;
import com.hihi.square.domain.store.event.StoreNoticeEvent;
import com.hihi.square.domain.store.service.StoreNoticeService;
import com.hihi.square.domain.user.entity.EmdAddress;
import com.hihi.square.domain.user.entity.User;
import com.hihi.square.domain.user.service.EmdAddressService;
import com.hihi.square.domain.user.service.UserService;
import com.hihi.square.global.common.CommonResponseDto;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/store/daily")
@RequiredArgsConstructor
public class StoreNoticeController {

	private final UserService userService;
	private final StoreNoticeService storeNoticeService;
	private final ImageRepository imageRepository;
	private final EmdAddressService emdAddressService;
	private final ApplicationEventPublisher eventPublisher;

	//가게 공지 작성
	@PostMapping
	public ResponseEntity postStoreNotice(Authentication authentication,
		@RequestBody @Valid StoreNoticeWriteRequestDto request) {
		String uid = authentication.getName();
		User user = userService.findByUid(uid).get();
		if (!(user instanceof Store)) {
			return new ResponseEntity(CommonResponseDto.builder().message("NOT_AUTHENTICATE").statusCode(400).build(),
				HttpStatus.BAD_GATEWAY);
		}

		Notice notice = storeNoticeService.write((Store)user, request);

		//찜한 고객에게 이벤트 발생
		List<User> userList = storeNoticeService.getDibsByStore((Store)user);
		eventPublisher.publishEvent(new StoreNoticeEvent(notice, "새로운 공지가 있어요.", userList));

		return new ResponseEntity(CommonResponseDto.builder().statusCode(201).message("SUCCESS_WRITE").build(),
			HttpStatus.CREATED);
	}

	//가게회원 공지 모두 가져오기
	@GetMapping("/list")
	public ResponseEntity getStoreNotices(Authentication authentication) {
		String uid = authentication.getName();
		User user = userService.findByUid(uid).get();
		if (!(user instanceof Store)) {
			return new ResponseEntity(CommonResponseDto.builder().message("NOT_AUTHENTICATE").statusCode(400).build(),
				HttpStatus.BAD_REQUEST);
		}
		StoreNoticesResponseDto result = StoreNoticesResponseDto.builder()
			.notices(storeNoticeService.getNoticeList((Store)user))
			.statusCode(200)
			.message("SUCCESS")
			.build();
		return new ResponseEntity(result, HttpStatus.OK);
	}

	//사용자회원 가게 공지 모두 가져오기
	@GetMapping("/list/{storeId}")
	public ResponseEntity getStoreNotices(@PathVariable("storeId") Integer storeId) {
		User user = userService.findByUsrId(storeId).get();
		if (!(user instanceof Store) || user.getUsrId() != storeId) {
			return new ResponseEntity(CommonResponseDto.builder().message("NOT_AUTHENTICATE").statusCode(400).build(),
				HttpStatus.BAD_GATEWAY);
		}
		StoreNoticesResponseDto result = StoreNoticesResponseDto.builder()
			.notices(storeNoticeService.getNoticeListPublic((Store)user))
			.statusCode(200)
			.message("SUCCESS")
			.build();
		return new ResponseEntity(result, HttpStatus.OK);
	}

	//가게 공지 상세 가져오기
	@GetMapping("/{id}")
	public ResponseEntity<?> getStoreNotice(@PathVariable("id") Integer snoId) {
		Optional<Notice> optionalNotice = storeNoticeService.getNotice(snoId);
		if (optionalNotice.isPresent()) {
			Notice notice = optionalNotice.get();
			List<Image> images = imageRepository.findAllByTypeAndConnectedId("SNO", snoId);
			List<ImagesDetailResponseDto> resultImages = new ArrayList<>();
			for (Image i : images) {
				resultImages.add(i.toDto());
			}
			StoreNoticeResponseDto result = StoreNoticeResponseDto.builder()
				.snoId(notice.getSnoId())
				.content(notice.getContent())
				.state(notice.getState())
				.createdAt(notice.getCreatedAt())
				.modifiedAt(notice.getModifiedAt())
				.images(resultImages).build();
			return new ResponseEntity<>(result, HttpStatus.OK);
		} else {
			return new ResponseEntity(CommonResponseDto.builder().statusCode(400).message("INVALID_NOTICE_ID").build(),
				HttpStatus.OK);
		}
	}

	//가게 공지 수정
	@PatchMapping
	public ResponseEntity<?> updateStoreNotice(Authentication authentication,
		@RequestBody @Valid StoreNoticeUpdateRequestDto request) {
		String uid = authentication.getName();
		User user = userService.findByUid(uid).get();

		Optional<Notice> noticeOptional = storeNoticeService.getNotice(request.getSnoId());
		if (!noticeOptional.isPresent()) {
			return new ResponseEntity<>(
				CommonResponseDto.builder().message("NOT_EXISTS_NOTICE").statusCode(400).build(),
				HttpStatus.BAD_REQUEST);
		}
		Notice notice = noticeOptional.get();

		// 사용자 검증
		if (user.getUsrId() != notice.getStore().getUsrId()) {
			return new ResponseEntity<>(CommonResponseDto.builder().message("NOT_AUTHENTICATE").statusCode(400).build(),
				HttpStatus.BAD_REQUEST);
		}

		storeNoticeService.updateNotice(notice, request);
		return new ResponseEntity<>(CommonResponseDto.builder().statusCode(200).message("UPDATE_NOTICE").build(),
			HttpStatus.OK);
	}

	//가게 공지 삭제
	@DeleteMapping("/{id}")
	public ResponseEntity deleteStoreNotice(Authentication authentication, @PathVariable("id") Integer snoId) {
		String uid = authentication.getName();
		User user = userService.findByUid(uid).get();
		Optional<Notice> optionalNotice = storeNoticeService.getNotice(snoId);
		if (!optionalNotice.isPresent()) {
			return new ResponseEntity(CommonResponseDto.builder().statusCode(400).message("NOT_EXISTS_NOTICE").build(),
				HttpStatus.BAD_REQUEST);
		}
		Notice notice = optionalNotice.get();
		//사용자 검증
		if (user.getUsrId() != notice.getStore().getUsrId()) {
			return new ResponseEntity(CommonResponseDto.builder().statusCode(400).message("NOT_AUTHENTICCATE").build(),
				HttpStatus.BAD_REQUEST);
		}
		storeNoticeService.deleteNotice(notice);
		return new ResponseEntity(CommonResponseDto.builder().statusCode(200).message("DELETE_NOTICE").build(),
			HttpStatus.OK);
	}

	//가게 공지 비공개 처리
	@PatchMapping("/{id}/private")
	public ResponseEntity updateStoreNoticePrivate(Authentication authentication, @PathVariable("id") Integer snoId) {
		String uid = authentication.getName();
		User user = userService.findByUid(uid).get();
		Optional<Notice> optionalNotice = storeNoticeService.getNotice(snoId);
		if (!optionalNotice.isPresent()) {
			return new ResponseEntity(CommonResponseDto.builder().statusCode(400).message("NOT_EXISTS_NOTICE").build(),
				HttpStatus.BAD_REQUEST);
		}
		Notice notice = optionalNotice.get();
		//사용자 검증
		if (user.getUsrId() != notice.getStore().getUsrId()) {
			return new ResponseEntity(CommonResponseDto.builder().statusCode(400).message("NOT_AUTHENTICCATE").build(),
				HttpStatus.BAD_REQUEST);
		}
		storeNoticeService.updateNoticePrivate(notice);
		return new ResponseEntity(CommonResponseDto.builder().message("COMPLETE").statusCode(200).build(),
			HttpStatus.OK);
	}

	//가게 공지 비공개 풀기
	@PatchMapping("/{id}/public")
	public ResponseEntity updateStoreNoticePublic(Authentication authentication, @PathVariable("id") Integer snoId) {
		String uid = authentication.getName();
		User user = userService.findByUid(uid).get();
		Optional<Notice> optionalNotice = storeNoticeService.getNotice(snoId);
		if (!optionalNotice.isPresent()) {
			return new ResponseEntity(CommonResponseDto.builder().statusCode(400).message("NOT_EXISTS_NOTICE").build(),
				HttpStatus.BAD_REQUEST);
		}
		Notice notice = optionalNotice.get();
		//사용자 검증
		if (user.getUsrId() != notice.getStore().getUsrId()) {
			return new ResponseEntity(CommonResponseDto.builder().statusCode(400).message("NOT_AUTHENTICCATE").build(),
				HttpStatus.BAD_REQUEST);
		}
		storeNoticeService.updateNoticePublic(notice);
		return new ResponseEntity(CommonResponseDto.builder().message("COMPLETE").statusCode(200).build(),
			HttpStatus.OK);
	}

	// 가게 공지 지역 + depth로 가져오기
	@GetMapping("/emd/{emdId}/{depth}")
	public ResponseEntity getStoreNoticesWithAddressAndDepth(@PathVariable("emdId") Integer emdId,
		@PathVariable("depth") Integer depth) {
		List<EmdAddress> emdAddressList = emdAddressService.getEmdAddressWithDepth(emdId, depth);
		StoreNoticesResponseDto result = StoreNoticesResponseDto.builder()
			.notices(storeNoticeService.getNoticeByEmdList(emdAddressList))
			.statusCode(200)
			.message("SUCCESS")
			.build();
		return new ResponseEntity(result, HttpStatus.OK);

	}

	// 내가 찜한 가게 공지 가져오기
	@GetMapping("/dibs")
	public ResponseEntity getMyDibsStoreNotice(Authentication authentication) {
		String uid = authentication.getName();
		User user = userService.findByUid(uid).get();
		StoreNoticesResponseDto response = StoreNoticesResponseDto.builder()
			.notices(storeNoticeService.getUserDibsStoreNotice(user))
			.statusCode(200)
			.message("SUCCESS")
			.build();
		return new ResponseEntity(response, HttpStatus.OK);
	}
}
