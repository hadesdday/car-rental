package com.carrental.responsemodel;

import lombok.Data;

@Data
public class ImageResponse {
    private String imageUrl;
    private String status;
    private Boolean isThumbnail;
}
