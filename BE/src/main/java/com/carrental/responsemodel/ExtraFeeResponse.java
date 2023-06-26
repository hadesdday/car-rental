package com.carrental.responsemodel;

import lombok.Data;

@Data
public class ExtraFeeResponse {
    private String name;
    private Long limitValue;
    private String unit;
    private Double fee;
    private String code;
}
