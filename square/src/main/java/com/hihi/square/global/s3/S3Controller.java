package com.hihi.square.global.s3;

import com.hihi.square.domain.image.dto.ImageFileThumbDto;
import com.hihi.square.domain.image.dto.request.ImageRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/file")
@RequiredArgsConstructor
public class S3Controller {

	private final S3Service s3Service;

	@PostMapping(value="/{type}/{id}", consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
	public ResponseEntity<ImageResponseDto> s3Upload(@PathVariable("type") String type, @PathVariable("id") Integer id, @RequestPart(value = "images") List<MultipartFile> files, @RequestPart(value="thumbs")List<MultipartFile> thumbs) {

		List<ImageRequestDto> images= new ArrayList<>();
		for(int i=0;i<files.size();i++){
			images.add(ImageRequestDto.builder().file(files.get(i)).thumbnail(thumbs.get(i)).build());
		}
		List<ImageFileThumbDto> result = s3Service.uploadFiles(type, id, images);
		return new ResponseEntity<>(ImageResponseDto.builder().statusCode(201).message("SUCCESS_WRITE").images(result).build(), HttpStatus.CREATED);
	}

}
