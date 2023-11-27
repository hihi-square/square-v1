package com.hihi.square.global.s3;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class S3Service {
	private final S3Uploader s3Uploader;

	private String getUrl(String type, Boolean isThumb){
		String url = "static/"+LocalDate.now().toString()+"/"+type;
		if (isThumb) url += "/thumb";
		return url;
	}


	@Transactional
	public String getFileUrl(String type, MultipartFile file, boolean isThumb) {
		String url = getUrl(type, isThumb);
		if(file != null) {
			String fileUrl = s3Uploader.uploadFileToS3(file, url);
			return fileUrl;
		}
		return null;
	}
}
