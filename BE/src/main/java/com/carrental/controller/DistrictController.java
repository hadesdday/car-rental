package com.carrental.controller;

import com.carrental.service.IDistrictService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/districts")
public class DistrictController {
    @Autowired
    private IDistrictService districtService;

    @GetMapping("/findByProvinceId")
    public ResponseEntity<?> findAllByProvinceById(@RequestParam("provinceId") Long provinceId) {
        return ResponseEntity.ok().body(districtService.findByProvinceId(provinceId));
    }
}
