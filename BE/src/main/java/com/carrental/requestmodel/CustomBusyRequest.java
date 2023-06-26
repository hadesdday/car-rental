package com.carrental.requestmodel;

import com.carrental.enums.RepeatedCalendarPriority;
import lombok.Data;

import java.util.Date;

@Data
public class CustomBusyRequest {
    private Long carId;
    private Date startDate;
    private Date endDate;
    private String value;
    private RepeatedCalendarPriority priority;
}
