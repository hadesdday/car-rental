package com.carrental.repository;

import com.carrental.entity.CarRentalEntity;
import com.carrental.enums.RentalStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface ICarRentalRepository extends JpaRepository<CarRentalEntity, Long> {
    long countByStatusAndCarId(RentalStatus status, Long carId);

    List<CarRentalEntity> getAllByCarUserUsernameAndStatusIsBetween(String username, RentalStatus status1, RentalStatus status2);

    List<CarRentalEntity> getAllByCarUserUsernameAndCarIdAndStatusIsBetween(String username, Long carId,
                                                                            RentalStatus status1, RentalStatus status2);

    CarRentalEntity findFirstByCarIdAndStatusBetweenAndStartDateBetweenOrEndDateBetween(Long carId,RentalStatus status1, RentalStatus status2, Date date1, Date date2, Date date3, Date date4);

    List<CarRentalEntity> findAllByUserIdAndStatus(Long userId, RentalStatus rentalStatus);

    List<CarRentalEntity> findAllByCarIdAndStatus(Long carId, RentalStatus rentalStatus);

}
