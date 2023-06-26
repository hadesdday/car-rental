package com.carrental.requestmodel;

import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
public class SearchCarRequest {
    private Integer pageNo;
    private Integer sortBy;
    private String address;
    private String seats;
    private String yearOfManufacture;
    private Boolean isDiscount;
    private String price;
    private Long brand;
    private String distanceLimit;
    private List<Long> features;
    private Boolean isFastRent;
    private Date startDate;
    private Date endDate;
    private List<String> type;
    private String transmission;
    private String fuel;
    private Double fuelConsumption;
    private Long serviceType;
    private String[] addressWithDriver;
}
