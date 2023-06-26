package com.carrental.requestmodel;

import com.carrental.enums.ChartCategory;
import lombok.Data;

import java.util.Date;

@Data
public class CarChartStatRequest {
    private String username;
    private Date startDate;
    private Date endDate;
    private ChartCategory category;
}