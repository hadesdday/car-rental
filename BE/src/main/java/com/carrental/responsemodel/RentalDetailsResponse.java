package com.carrental.responsemodel;

import com.carrental.enums.RentalStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RentalDetailsResponse {
    private Long id;
    private String model;
    private Date startDate;
    private Date endDate;
    private Double avgRating;
    private String customerName;
    private String customerPhone;
    private RentalStatus status;
    private Long distanceLimit;
    private Double price;
    private String bannerUrl;
    private Date createdDate;
}
