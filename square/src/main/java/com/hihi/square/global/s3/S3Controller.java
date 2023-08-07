package com.hihi.square.global.s3;

import com.hihi.square.domain.image.dto.response.FileThumbResponseDto;
import com.hihi.square.domain.image.dto.request.ImageRequestDto;
import com.hihi.square.domain.image.dto.response.FilesThumbsResponseDto;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class S3Controller {

	private final S3Service s3Service;

	// 파일 여러개 + 썸네일 여러개
	@PostMapping(value="/files/thumbs/{type}", consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
	public ResponseEntity<ImageResponseDto> s3UploadFilesAndThumbs(@PathVariable("type") String type,  @RequestPart(value = "images") List<MultipartFile> files, @RequestPart(value="thumbs")List<MultipartFile> thumbs) {
		List<FileThumbResponseDto> result = new ArrayList<>();
		for (int i=0;i<files.size();i++){
			result.add(FileThumbResponseDto.builder().url(s3Service.getFileUrl(type, files.get(i))).thumbnail(
				s3Service.getFileUrl(type, thumbs.get(i))).build());
		}
		return new ResponseEntity<>(ImageResponseDto.builder().statusCode(201).message("SUCCESS_WRITE").images(result).build(), HttpStatus.CREATED);
	}

	// 파일 하나 + 썸네일 하나
	@PostMapping(value="/file/thumb/{type}", consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
	public ResponseEntity<?> s3UploadFileAndThumb(@PathVariable("type") String type, @RequestPart(value = "image") MultipartFile file, @RequestPart(value="thumb")MultipartFile thumb) {
		FileThumbResponseDto result = FileThumbResponseDto.builder()
			.url(s3Service.getFileUrl(type, file))
			.thumbnail(s3Service.getFileUrl(type, thumb))
			.build()
		return new ResponseEntity<>(
			FilesThumbsResponseDto.builder().statusCode(201).message("SUCCESS_WRITE").im(result).build(), HttpStatus.CREATED);
	}
	
	// 파일 하나
	@PostMapping(value="/file/{type}", consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
	public ResponseEntity<ImageResponseDto> s3UploadFile(@PathVariable("type") String type,  @RequestPart(value = "image") MultipartFile files) {

		List<ImageRequestDto> images= new ArrayList<>();
		for(int i=0;i<files.size();i++){
			images.add(ImageRequestDto.builder().file(files.get(i)).thumbnail(thumbs.get(i)).build());
		}
		List<FileThumbResponseDto> result = s3Service.uploadFiles(type,  images);
		return new ResponseEntity<>(ImageResponseDto.builder().statusCode(201).message("SUCCESS_WRITE").images(result).build(), HttpStatus.CREATED);
	}
	
	// 파일 여러개
	@PostMapping(value="/files/{type}", consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
	public ResponseEntity<ImageResponseDto> s3UploadFiles(@PathVariable("type") String type,  @RequestPart(value = "images") List<MultipartFile> files, @RequestPart(value="thumbs")List<MultipartFile> thumbs) {

		List<ImageRequestDto> images= new ArrayList<>();
		for(int i=0;i<files.size();i++){
			images.add(ImageRequestDto.builder().file(files.get(i)).thumbnail(thumbs.get(i)).build());
		}
		List<FileThumbResponseDto> result = s3Service.uploadFiles(type,  images);
		return new ResponseEntity<>(ImageResponseDto.builder().statusCode(201).message("SUCCESS_WRITE").images(result).build(), HttpStatus.CREATED);
	}

}
