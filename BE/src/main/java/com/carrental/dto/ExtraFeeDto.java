package com.carrental.dto;

import lombok.Data;

@Data
public class ExtraFeeDto {
    private Long id;
    private String name;
    private Long limit;
    private String unit;
    private Double fee;
}
