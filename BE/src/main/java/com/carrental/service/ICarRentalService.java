package com.carrental.service;

import com.carrental.entity.CarRentalEntity;
import com.carrental.enums.RentalStatus;
import com.carrental.requestmodel.UpdateRentalStatusRequest;
import com.carrental.responsemodel.*;

import java.util.Date;
import java.util.List;

public interface ICarRentalService {
    List<RentalListingResponse> findByOwner(String username);

    RentalDetailsResponse findById(Long id) throws Exception;

    UpdateRentalStatusResponse acceptRental(UpdateRentalStatusRequest request) throws Exception;

    UpdateRentalStatusResponse rejectRental(UpdateRentalStatusRequest request) throws Exception;

    UpdateRentalStatusResponse confirmDeliveredCarToRenter(UpdateRentalStatusRequest request) throws Exception;

    UpdateRentalStatusResponse completeRental(UpdateRentalStatusRequest request) throws Exception;

    long countByStatusAndCarId(RentalStatus status, long id);

    List<CalendarListingResponse> findCalendarByOwner(String username);

    List<CalendarListingResponse> findCalendarByOwnerAndCarId(String username, Long carId);

    CarRentalEntity findFirstByStartDateBetweenOrEndDateBetween(Long carId,Date date1, Date date2, Date date3, Date date4);

    // API Huy
    List<RentalCarResponse> findAllByUserIdAndStatus(Long id, RentalStatus rentalStatus);

    CarRentalEntity saveAndFlush(CarRentalEntity carRentalEntity);

    List<CarRentalEntity> findAllByCarIdAndStatus(Long carId, RentalStatus rentalStatus);
}
