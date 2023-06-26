package com.carrental.requestmodel;

import lombok.Data;

@Data
public class BookingRequest {
    private Long startTime;
    private Long endTime;
    private Long userId;
    private Long carId;
    private Long promoId;
}
