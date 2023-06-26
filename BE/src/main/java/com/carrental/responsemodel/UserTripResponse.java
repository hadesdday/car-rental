package com.carrental.responsemodel;

import lombok.Data;

import java.util.List;

@Data
public class UserTripResponse {
    List<RentalCarResponse> rentalCars;
    List<RentalCarResponse> rentedCars;

    public UserTripResponse(List<RentalCarResponse> rentalCars, List<RentalCarResponse> rentedCars) {
        this.rentalCars = rentalCars;
        this.rentedCars = rentedCars;
    }
}
