package com.hihi.square.domain.store.controller;


import java.nio.channels.ReadPendingException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.hihi.square.domain.image.dto.request.ImageRequestDto;
import com.hihi.square.domain.image.dto.response.ImageResponseDto;
import com.hihi.square.domain.image.respository.ImageRepository;
import com.hihi.square.domain.store.dto.request.StoreNoticeUpdateRequestDto;
import com.hihi.square.domain.store.dto.request.StoreNoticeWriteRequestDto;
import com.hihi.square.domain.store.dto.response.StoreNoticeResponseDto;
import com.hihi.square.domain.store.dto.response.StoreNoticesResponseDto;
import com.hihi.square.domain.store.entity.Notice;
import com.hihi.square.domain.store.entity.Store;
import com.hihi.square.domain.store.service.StoreNoticeService;
import com.hihi.square.domain.user.entity.User;
import com.hihi.square.domain.user.service.UserService;
import com.hihi.square.global.common.CommonResponseDto;
import com.hihi.square.domain.image.entity.Image;
import com.hihi.square.global.s3.S3Service;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/store/daily")
@RequiredArgsConstructor
public class StoreNoticeController {

	private final UserService userService;
	private final StoreNoticeService storeNoticeService;
	private final ImageRepository imageRepository;
	private final S3Service s3Service;

	//가게 공지 작성
	@PostMapping(consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
	public ResponseEntity<CommonResponseDto> postStoreNotice(Authentication authentication, @RequestPart("data") @Valid StoreNoticeWriteRequestDto request, @RequestPart(value = "images") List<MultipartFile> files, @RequestPart(value="thumbs")List<MultipartFile> thumbs) {
		String uid = authentication.getName();
		User user = userService.findByUid(uid).get();
		if (!(user instanceof Store) || user.getUsrId() != request.getUsrId()) {
			return new ResponseEntity<>(CommonResponseDto.builder().message("NOT_AUTHENTICATE").statusCode(400).build(),
				HttpStatus.BAD_GATEWAY);
		}
		List<ImageRequestDto> images= new ArrayList<>();
		for(int i=0;i<files.size();i++){
			images.add(ImageRequestDto.builder().file(files.get(i)).thumbnail(thumbs.get(i)).build());
		}
		storeNoticeService.write((Store) user, request, images);
		return new ResponseEntity<>(CommonResponseDto.builder().statusCode(201).message("SUCCESS_WRITE").build(), HttpStatus.CREATED);
	}

	//가게 공지 모두 가져오기
	@GetMapping("/list/{storeId}")
	public ResponseEntity getStoreNotices(@PathVariable("storeId") Integer storeId){
		User user = userService.findByUsrId(storeId).get();
		if (!(user instanceof Store) || user.getUsrId() != storeId) {
			return new ResponseEntity(CommonResponseDto.builder().message("NOT_AUTHENTICATE").statusCode(400).build(),
				HttpStatus.BAD_GATEWAY);
		}
		StoreNoticesResponseDto result =  StoreNoticesResponseDto.builder()
			.notices(storeNoticeService.getNoticeList((Store) user))
			.statusCode(200)
			.message("SUCCESS")
			.build();
		return new ResponseEntity(result, HttpStatus.OK);
	}

	//가게 공지 상세 가져오기
	@GetMapping("/{id}")
	public ResponseEntity<?> getStoreNotice(@PathVariable("id") Integer snoId) {
		Optional<Notice> optionalNotice = storeNoticeService.getNotice(snoId);
		if (optionalNotice.isPresent()){
			Notice notice = optionalNotice.get();
			List<Image> images = imageRepository.findAllByTypeAndConnectedId("SNO", snoId);
			List<ImageResponseDto> resultImages = new ArrayList<>();
			for(Image i : images) {
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
			return new ResponseEntity(CommonResponseDto.builder().statusCode(204).message("NOT_EXISTS_NOTICE").build(), HttpStatus.NO_CONTENT);
		}
	}
	//가게 공지 수정
	@PatchMapping
	public ResponseEntity<?> updateStoreNotice(Authentication authentication,@RequestBody @Valid StoreNoticeUpdateRequestDto request){
		String uid = authentication.getName();
		User user = userService.findByUid(uid).get();
		// 사용자 검증
		if (user.getUsrId() != request.getUsrId()){
			return new ResponseEntity<>(CommonResponseDto.builder().message("NOT_AUTHENTICATE").statusCode(400).build(), HttpStatus.BAD_REQUEST);
		}
		Optional<Notice> notice = storeNoticeService.getNotice(request.getSnoId());
		if (!notice.isPresent()){
			return new ResponseEntity<>(CommonResponseDto.builder().message("NOT_EXISTS_NOTICE").statusCode(400).build(), HttpStatus.BAD_REQUEST);
		}
		storeNoticeService.updateNotice(notice.get(), request);
		return new ResponseEntity<>(CommonResponseDto.builder().statusCode(200).message("UPDATE_NOTICE").build(), HttpStatus.OK);
	}

	//가게 공지 삭제
	@DeleteMapping("/{id}")
	public ResponseEntity deleteStoreNotice(Authentication authentication, @PathVariable("id")Integer snoId) {
		String uid = authentication.getName();
		User user = userService.findByUid(uid).get();
		Optional<Notice> optionalNotice =storeNoticeService.getNotice(snoId);
		if (!optionalNotice.isPresent()){
			return new ResponseEntity(CommonResponseDto.builder().statusCode(400).message("NOT_EXISTS_NOTICE").build(),HttpStatus.BAD_REQUEST);
		}
		Notice notice = optionalNotice.get();
		//사용자 검증
		if (user.getUsrId() != notice.getStore().getUsrId()){
			return new ResponseEntity(CommonResponseDto.builder().statusCode(400).message("NOT_AUTHENTICCATE").build(), HttpStatus.BAD_REQUEST);
		}
		storeNoticeService.deleteNotice(notice);
		return new ResponseEntity(CommonResponseDto.builder().statusCode(200).message("DELETE_NOTICE").build(), HttpStatus.OK);
	}

	//가게 공지 비공개 처리
	@PatchMapping("/{id}/private")
	public ResponseEntity updateStoreNoticePrivate(Authentication authentication, @PathVariable("id") Integer snoId){
		String uid = authentication.getName();
		User user = userService.findByUid(uid).get();
		Optional<Notice> optionalNotice =storeNoticeService.getNotice(snoId);
		if (!optionalNotice.isPresent()){
			return new ResponseEntity(CommonResponseDto.builder().statusCode(400).message("NOT_EXISTS_NOTICE").build(),HttpStatus.BAD_REQUEST);
		}
		Notice notice = optionalNotice.get();
		//사용자 검증
		if (user.getUsrId() != notice.getStore().getUsrId()){
			return new ResponseEntity(CommonResponseDto.builder().statusCode(400).message("NOT_AUTHENTICCATE").build(), HttpStatus.BAD_REQUEST);
		}
		storeNoticeService.updateNoticePrivate(notice);
		return new ResponseEntity(CommonResponseDto.builder().message("COMPLETE").statusCode(200).build(), HttpStatus.OK);
	}

	//가게 공지 비공개 풀기
	@PatchMapping("/{id}/public")
	public ResponseEntity updateStoreNoticePublic(Authentication authentication, @PathVariable("id") Integer snoId){
		String uid = authentication.getName();
		User user = userService.findByUid(uid).get();
		Optional<Notice> optionalNotice =storeNoticeService.getNotice(snoId);
		if (!optionalNotice.isPresent()){
			return new ResponseEntity(CommonResponseDto.builder().statusCode(400).message("NOT_EXISTS_NOTICE").build(),HttpStatus.BAD_REQUEST);
		}
		Notice notice = optionalNotice.get();
		//사용자 검증
		if (user.getUsrId() != notice.getStore().getUsrId()){
			return new ResponseEntity(CommonResponseDto.builder().statusCode(400).message("NOT_AUTHENTICCATE").build(), HttpStatus.BAD_REQUEST);
		}
		storeNoticeService.updateNoticePublic(notice);
		return new ResponseEntity(CommonResponseDto.builder().message("COMPLETE").statusCode(200).build(), HttpStatus.OK);
	}
}
