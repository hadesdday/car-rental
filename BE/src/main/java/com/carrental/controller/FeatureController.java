package com.carrental.controller;

import com.carrental.entity.FeatureEntity;
import com.carrental.requestmodel.FeatureRequest;
import com.carrental.responsemodel.APIResponse;
import com.carrental.service.IFeatureService;
import com.carrental.service.IFileStorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.util.List;

@RestController
@RequestMapping("/api/features")
public class FeatureController {
    @Autowired
    private IFeatureService featureService;

    @Autowired
    private IFileStorageService fileStorageService;

    @GetMapping("/findAll")
    public ResponseEntity<?> findAll() {
        return ResponseEntity.ok().body(featureService.findAll());
    }

    @GetMapping("/findAllByIdIn")
    public ResponseEntity<?> findAllByIdIn(@RequestParam List<Long> ids) {
        return ResponseEntity.ok().body(featureService.findAllByIdIn(ids));
    }
    @PostMapping("/add")
    public ResponseEntity addFeature(@ModelAttribute FeatureRequest featureRequest){
        try{
            this.fileStorageService.save(featureRequest.getFile(), "feature-icon");
            FeatureEntity newFeatureEntity = new FeatureEntity();
            newFeatureEntity.setName(featureRequest.getName());
            newFeatureEntity.setIconFilename(this.fileStorageService.getFilename(featureRequest.getFile()));
            this.featureService.save(newFeatureEntity);
            APIResponse<String> response = new APIResponse<String>("Tạo thành công", HttpStatus.OK.getReasonPhrase(), HttpStatus.OK.value());
            return ResponseEntity.ok(response);
        }catch (Exception e){
            APIResponse<String> response = new APIResponse<String>("Tạo thất bại", HttpStatus.SERVICE_UNAVAILABLE.getReasonPhrase(), HttpStatus.SERVICE_UNAVAILABLE.value());
            return ResponseEntity.ok(response);
        }
    }
}
