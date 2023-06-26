package com.carrental.requestmodel;

import lombok.Data;

@Data
public class UpdateRentalStatusRequest {
    private Long id;
    private String modifiedBy;
}
