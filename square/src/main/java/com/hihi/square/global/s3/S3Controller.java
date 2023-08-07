package com.hihi.square.global.s3;

import com.hihi.square.global.s3.dto.*;
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
	public ResponseEntity<FilesThumbsResponseDto> s3UploadFilesAndThumbs(@PathVariable("type") String type,  @RequestPart(value = "images") List<MultipartFile> files, @RequestPart(value="thumbs")List<MultipartFile> thumbs) {
		List<FileThumbDto> result = new ArrayList<>();
		for (int i=0;i<files.size();i++){
			String url = s3Service.getFileUrl(type, files.get(i), false);
			String thumbUrl = s3Service.getFileUrl(type, thumbs.get(i), true);
			result.add(FileThumbDto.builder()
					.url(url)
					.thumb(thumbUrl)
					.build());
		}
		return new ResponseEntity<>(FilesThumbsResponseDto.builder().statusCode(201).files(result).build(), HttpStatus.CREATED);
	}

	// 파일 하나 + 썸네일 하나
	@PostMapping(value="/file/thumb/{type}", consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
	public ResponseEntity<FileThumbResponseDto> s3UploadFileAndThumb(@PathVariable("type") String type, @RequestPart(value = "image") MultipartFile file, @RequestPart(value="thumb")MultipartFile thumb) {
		String url = s3Service.getFileUrl(type, file, false);
		String thumbUrl = s3Service.getFileUrl(type, thumb, true);
		return new ResponseEntity<>(FileThumbResponseDto.builder().file(FileThumbDto.builder().url(url).thumb(thumbUrl).build()).statusCode(201).build(), HttpStatus.CREATED);
	}
	
	// 파일 하나
	@PostMapping(value="/file/{type}", consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
	public ResponseEntity<FileResponseDto> s3UploadFile(@PathVariable("type") String type,  @RequestPart(value = "image") MultipartFile file) {
		String url = s3Service.getFileUrl(type, file, false);
		return new ResponseEntity<>(FileResponseDto.builder().statusCode(201).url(url).build(), HttpStatus.CREATED);
	}
	
	// 파일 여러개
	@PostMapping(value="/files/{type}", consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
	public ResponseEntity<FilesResponseDto> s3UploadFiles(@PathVariable("type") String type, @RequestPart(value = "images") List<MultipartFile> files) {
		List<String> result = new ArrayList<>();
		for(int i=0;i<files.size();i++){
			result.add(
				s3Service.getFileUrl(type, files.get(i), false)
			);
		}
		return new ResponseEntity<>(FilesResponseDto.builder().statusCode(201).urls(result).build(), HttpStatus.CREATED);
	}

}
