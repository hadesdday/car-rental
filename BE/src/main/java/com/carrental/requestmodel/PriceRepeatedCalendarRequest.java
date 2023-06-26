package com.carrental.requestmodel;

import lombok.Data;

import java.util.Date;

@Data
public class PriceRepeatedCalendarRequest {
    private Long carId;
    private Date startDate;
    private Date endDate;
}
