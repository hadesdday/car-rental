package com.carrental.controller;

import com.carrental.service.IBrandService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/brands")
@CrossOrigin("http://localhost:4200")
public class BrandController {
    @Autowired
    private IBrandService service;

    @GetMapping("/getModels/{id}")
    public ResponseEntity<?> getModelsById(@PathVariable("id") Long id) {
        try {
            return ResponseEntity.ok().body(service.findModelsById(id));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/getModels")
    public ResponseEntity<?> getAllModel() {
        try {
            return ResponseEntity.ok().body(service.findAll());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

}
