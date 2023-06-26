package com.carrental.controller;

import com.carrental.dto.PromoDTO;
import com.carrental.entity.PromoEntity;
import com.carrental.enums.StandardStatus;
import com.carrental.requestmodel.NewPromoRequest;
import com.carrental.responsemodel.APIResponse;
import com.carrental.service.IPromoService;
import com.carrental.specification.builder.PromoSpecificationBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@Controller
@RequestMapping("/api/promo")
public class PromoController {
    @Autowired
    private IPromoService promoService;

    @PostMapping("/add")
    public ResponseEntity addNewPromo(@RequestBody NewPromoRequest newPromoRequest) {
        try {
            this.promoService.addNewPromo(newPromoRequest);
            APIResponse<String> response = new APIResponse<>("Đã tạo mới", HttpStatus.OK.getReasonPhrase(), HttpStatus.OK.value());
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            APIResponse<String> response = new APIResponse<>("Tạo thất bại", HttpStatus.BAD_REQUEST.getReasonPhrase(), HttpStatus.BAD_REQUEST.value());
            return ResponseEntity.ok(response);
        }
    }
    @PostMapping("/update")
    public ResponseEntity updatePromo(@RequestBody PromoDTO updatedPromo) {
        try {
        System.out.println(updatedPromo);
            this.promoService.updatePromo(updatedPromo);
            APIResponse<String> response = new APIResponse<>("Đã cập nhật", HttpStatus.OK.getReasonPhrase(), HttpStatus.OK.value());
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            System.out.println(e);
            APIResponse<String> response = new APIResponse<>("Cập nhật thất bại", HttpStatus.BAD_REQUEST.getReasonPhrase(), HttpStatus.BAD_REQUEST.value());
            return ResponseEntity.ok(response);
        }
    }
    @GetMapping("/remove/{promoId}")
    public ResponseEntity removePromo(@PathVariable Long promoId) {
        try {
            this.promoService.removePromo(promoId);
            APIResponse<String> response = new APIResponse<>("Đã xoá mã giảm giá", HttpStatus.OK.getReasonPhrase(), HttpStatus.OK.value());
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            APIResponse<String> response = new APIResponse<>("Xoá không thành công", HttpStatus.BAD_REQUEST.getReasonPhrase(), HttpStatus.BAD_REQUEST.value());
            return ResponseEntity.ok(response);
        }
    }

    @GetMapping("/available-all")
    public ResponseEntity findAllAvailable() {
        try {
            PromoSpecificationBuilder builder = new PromoSpecificationBuilder();
//            Specification<PromoEntity> spec = builder.with("", "", "availableDate").with("quantity", 0, "greaterThan").build();
            Specification<PromoEntity> spec = builder.with("quantity", 0, "greaterThan").build();
            List<PromoDTO> availablePromosData = this.promoService.findAllAvailable(spec);
            APIResponse<List<PromoDTO>> response = new APIResponse<>(availablePromosData, HttpStatus.OK.getReasonPhrase(), HttpStatus.OK.value());
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            APIResponse<String> response = new APIResponse<>("Đã có lỗi xảy ra", HttpStatus.SERVICE_UNAVAILABLE.getReasonPhrase(), HttpStatus.SERVICE_UNAVAILABLE.value());
            return ResponseEntity.ok(response);
        }
    }
    @GetMapping("/all")
    public ResponseEntity findAll() {
        try {
            List<PromoDTO> availablePromosData = this.promoService.findAll();
            APIResponse<List<PromoDTO>> response = new APIResponse<>(availablePromosData, HttpStatus.OK.getReasonPhrase(), HttpStatus.OK.value());
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            APIResponse<String> response = new APIResponse<>("Đã có lỗi xảy ra", HttpStatus.SERVICE_UNAVAILABLE.getReasonPhrase(), HttpStatus.SERVICE_UNAVAILABLE.value());
            return ResponseEntity.ok(response);
        }
    }
}
