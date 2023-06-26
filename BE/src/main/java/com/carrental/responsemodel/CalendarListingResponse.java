package com.carrental.responsemodel;

import com.carrental.enums.RentalStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CalendarListingResponse {
    private Date startDate;
    private Date endDate;
    private String modelName;
    private Integer yearOfManufacture;
    private Double rentalPrice;
    private String plate;
    private RentalStatus status;
}
