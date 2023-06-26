package com.carrental.responsemodel;

import lombok.Data;

import java.util.List;

@Data
public class ServiceFeeResponse {
    private Double defaultPrice;
    private Integer discountByWeek;
    private Integer discountByMonth;
    private List<ExtraFeeResponse> extraFeeList;
}
