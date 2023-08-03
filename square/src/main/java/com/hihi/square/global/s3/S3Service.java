package com.hihi.square.global.s3;

import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.hihi.square.domain.image.dto.ImageFileThumbDto;
import com.hihi.square.domain.image.dto.request.ImageRequestDto;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class S3Service {
	private final S3Uploader s3Uploader;

	private String getUrl(String type, Integer id){
		String url = "";
		switch (type){
			case "storeNotice":
				url = "static/store/"+id+"/notice/images";
				break;
			case "storeThumbnail":
				url="static/store/"+id+"/thumbs";
				break;
			case "userProfile":
				url="static/user/"+id+"/profile";
				break;
		}
		return url;
	}
	@Transactional
	public List<ImageFileThumbDto> uploadFiles(String type,Integer id, List<ImageRequestDto> files) {
		String url = getUrl(type, id);
		List<ImageFileThumbDto> result = new ArrayList<>();
		if(files != null && files.size()>0) {
			for(int i=0;i<files.size();i++) {
				String fileUrl = s3Uploader.uploadFileToS3(files.get(i).getFile(), url);
				String thumbnailUrl = s3Uploader.uploadFileToS3(files.get(i).getThumbnail(),url+"/thumb");
				result.add(ImageFileThumbDto.builder()
						.url(fileUrl)
						.thumbnail(thumbnailUrl)
						.build());
			}
		}
		return result;
	}
	@Transactional
	public ImageFileThumbDto uploadFile(String type,Integer id, ImageRequestDto file) {
		String url = getUrl(type, id);
		if(file != null) {
			String fileUrl = s3Uploader.uploadFileToS3(file.getFile(), url);
			String thumbnailUrl = s3Uploader.uploadFileToS3(file.getThumbnail(),url+"/thumb");
			return ImageFileThumbDto.builder()
				.url(fileUrl)
				.thumbnail(thumbnailUrl)
				.build();
		}
		return null;
	}
}
