package com.carrental.requestmodel;

import lombok.Data;

import java.util.Date;

@Data
public class RepeatedCalendarDayRequest {
    private Long carId;
    private Date startDate;
}
