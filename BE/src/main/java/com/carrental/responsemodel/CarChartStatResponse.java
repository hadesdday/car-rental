package com.carrental.responsemodel;

import lombok.Data;

@Data
public class CarChartStatResponse {
    private Integer month;
    private Integer year;
    private Double value;

    public CarChartStatResponse(Integer month, Integer year, Double value) {
        this.month = month;
        this.year = year;
        this.value = value;
    }
}