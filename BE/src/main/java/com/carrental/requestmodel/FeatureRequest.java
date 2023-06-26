package com.carrental.requestmodel;


import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
public class FeatureRequest {
    private String name;
    private MultipartFile file;
}
