package com.carrental.responsemodel;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SearchCarResponse {
    private Long id;
    private String modelName;
    private Integer yearOfManufacture;
    private String location;
    private Double price;
    private Double avgRating;
    private Long totalCompletedRental;
    private List<FeatureDTO> features;
    private String bannerUrl;
    private String transmission;
    private Double deliveryToTenantFee;
    private String type;
    private Integer totalPages;
    private String serviceType;
}
