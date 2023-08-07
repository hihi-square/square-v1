package com.hihi.square.domain.image.dto.request;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ImageRequestDto {
    private String url;
    private Integer order;
    private String type;
    private Integer connectedId;
    private String thumbnail;

}
