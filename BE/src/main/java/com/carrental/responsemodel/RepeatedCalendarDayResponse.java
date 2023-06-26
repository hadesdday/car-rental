package com.carrental.responsemodel;

import com.carrental.enums.RepeatedCalendarType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RepeatedCalendarDayResponse {
    private Long id;
    private Long carId;
    private Date startDate;
    private Date endDate;
    private String value;
    private RepeatedCalendarType type;
}
