package com.carrental.requestmodel;

import lombok.Data;

@Data
public class ServiceFeeRequest {
    private Long serviceTypeId;
    private Double defaultPrice;
    private Integer discountByWeek;
    private Integer discountByMonth;
}
