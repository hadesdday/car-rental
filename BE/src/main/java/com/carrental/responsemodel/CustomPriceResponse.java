package com.carrental.responsemodel;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@Builder
@NoArgsConstructor
public class CustomPriceResponse {
    private Long id;
    private Long carId;
    private Date startDate;
    private Date endDate;
    private String value;
}
