package com.carrental.requestmodel;

import lombok.Data;
import org.hibernate.exception.DataException;

import java.util.Date;

@Data
public class DeleteRepeatedCalendarRequest {
    private Long carId;
    private Date startDate;
    private Date endDate;
}
