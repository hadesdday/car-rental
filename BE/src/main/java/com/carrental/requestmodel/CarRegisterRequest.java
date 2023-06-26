package com.carrental.requestmodel;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CarRegisterRequest {
    private String username;
    private String plate;
    private Long modelId;
    private Long brandId;
    private Integer seats;
    private String color;
    private String fuel;
    private Double fuelConsumption;
    private String transmission;
    private String description;
    private Integer yearOfManufacture;
    private List<Long> featureList;
    private Double defaultPrice; //unit_price
    private Integer discountByWeek;
    private Integer discountByMonth;
    private Boolean isFastRent;
    private String addressName;//
    private List<ExtraFeeRequest> extraFees; //over distance limit fee,delivery fee,....
    private Long serviceTypeId;//wd;self-drive
    private String policies;
    private List<String> imagesList;
    private Long wardId;
    private Long districtId;
    private Long provinceId;
}
