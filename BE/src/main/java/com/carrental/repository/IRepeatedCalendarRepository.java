package com.carrental.repository;

import com.carrental.entity.RepeatedCalendarEntity;
import com.carrental.enums.RepeatedCalendarType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface IRepeatedCalendarRepository extends JpaRepository<RepeatedCalendarEntity, Long> {
    List<RepeatedCalendarEntity> findAllByCarUserUsernameAndCarIdAndType(String username, Long carId, RepeatedCalendarType type);

    RepeatedCalendarEntity findFirstByCarIdAndTypeAndStartDateEquals(Long carId, RepeatedCalendarType type, Date startDate);

    RepeatedCalendarEntity findFirstByCarIdAndTypeAndStartDateEqualsAndEndDateEquals(Long carId, RepeatedCalendarType type, Date startDate, Date endDate);
}
