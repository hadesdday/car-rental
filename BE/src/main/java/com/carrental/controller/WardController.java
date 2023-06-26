package com.carrental.controller;

import com.carrental.service.IWardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/wards")
public class WardController {
    @Autowired
    private IWardService wardService;

    @GetMapping("/getByProvinceAndDistrict")
    public ResponseEntity<?> findAllByProvinceAndDistrict(@RequestParam("provinceId") Long provinceId, @RequestParam("districtId") Long districtId) {
        return ResponseEntity.ok().body(wardService.findAllByDistrictId(provinceId, districtId));
    }

}
