package com.carrental.responsemodel;

import lombok.Data;

import java.util.Date;

@Data
public class RentalListingResponse {
    private Long id;
    private String bannerUrl;
    private String model;
    private Integer yearOfManufacture;
    private String plate;
    private String customerName;
    private Double avgRating;
    private Double price;
    private Date startDate;
    private Date endDate;

    public RentalListingResponse(Long id, String bannerUrl, String model, Integer yearOfManufacture, String plate, String customerName, Double avgRating, Double price, Date startDate, Date endDate) {
        this.id = id;
        this.bannerUrl = bannerUrl;
        this.model = model;
        this.yearOfManufacture = yearOfManufacture;
        this.plate = plate;
        this.customerName = customerName;
        this.avgRating = avgRating;
        this.price = price;
        this.startDate = startDate;
        this.endDate = endDate;
    }
}
