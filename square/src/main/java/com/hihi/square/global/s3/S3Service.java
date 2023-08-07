package com.hihi.square.global.s3;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.hihi.square.domain.image.dto.response.FileThumbResponseDto;
import com.hihi.square.domain.image.dto.request.ImageRequestDto;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class S3Service {
	private final S3Uploader s3Uploader;

	private String getUrl(String type){
		String url = "";
		String now = LocalDate.now().toString();
		switch (type){
			case "storeNotice":
				url = "static/store/"+now+"/notice/images";
				break;
			case "storeThumbnail":
				url="static/store/"+now+"/thumbs";
				break;
			case "userProfile":
				url="static/user/"+now+"/profile";
				break;
		}
		return url;
	}
	@Transactional
	public List<FileThumbResponseDto> uploadFiles(String type, List<ImageRequestDto> files) {
		String url = getUrl(type);
		List<FileThumbResponseDto> result = new ArrayList<>();
		if(files != null && files.size()>0) {
			for(int i=0;i<files.size();i++) {
				String fileUrl = s3Uploader.uploadFileToS3(files.get(i).getFile(), url);
				String thumbnailUrl = s3Uploader.uploadFileToS3(files.get(i).getThumbnail(),url+"/thumb");
				result.add(FileThumbResponseDto.builder()
						.url(fileUrl)
						.thumbnail(thumbnailUrl)
						.build());
			}
		}
		return result;
	}
	@Transactional
	public FileThumbResponseDto uploadFile(String type, ImageRequestDto file) {
		String url = getUrl(type);
		if(file != null) {
			String fileUrl = s3Uploader.uploadFileToS3(file.getFile(), url);
			String thumbnailUrl = s3Uploader.uploadFileToS3(file.getThumbnail(),url+"/thumb");
			return FileThumbResponseDto.builder()
				.url(fileUrl)
				.thumbnail(thumbnailUrl)
				.build();
		}
		return null;
	}

	@Transactional
	public String getFileUrl(String type, MultipartFile file) {
		String url = getUrl(type);
		if(file != null) {
			String fileUrl = s3Uploader.uploadFileToS3(file, url);
			return fileUrl;
		}
		return null;
	}
}
