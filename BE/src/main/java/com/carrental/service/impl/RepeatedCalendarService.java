package com.carrental.service.impl;

import com.carrental.constance.ErrorMessage;
import com.carrental.entity.CarEntity;
import com.carrental.entity.CarRentalEntity;
import com.carrental.entity.RepeatedCalendarEntity;
import com.carrental.enums.RepeatedCalendarType;
import com.carrental.repository.IRepeatedCalendarRepository;
import com.carrental.requestmodel.CustomBusyRequest;
import com.carrental.requestmodel.CustomPriceRequest;
import com.carrental.requestmodel.DeleteRepeatedCalendarRequest;
import com.carrental.requestmodel.RepeatedCalendarDayRequest;
import com.carrental.responsemodel.*;
import com.carrental.service.ICarRentalService;
import com.carrental.service.ICarService;
import com.carrental.service.IRepeatedCalendarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class RepeatedCalendarService implements IRepeatedCalendarService {
    @Autowired
    private IRepeatedCalendarRepository repeatedCalendarRepository;
    @Autowired
    private ICarService carService;
    @Autowired
    private ICarRentalService carRentalService;
    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public CustomPriceResponse saveCustomPrice(CustomPriceRequest request) throws Exception {
        RepeatedCalendarEntity repeatedCalendar = repeatedCalendarRepository.findFirstByCarIdAndTypeAndStartDateEqualsAndEndDateEquals(
                request.getCarId(), RepeatedCalendarType.PRICE, request.getStartDate(), request.getEndDate());
        if (repeatedCalendar != null) {
            repeatedCalendar.setValue(request.getValue());
        } else {
            Optional<CarEntity> car = carService.findById(request.getCarId());
            if (!car.isPresent()) throw new Exception(ErrorMessage.NO_CAR_WAS_FOUND);
            repeatedCalendar = RepeatedCalendarEntity.builder()
                    .value(request.getValue())
                    .startDate(request.getStartDate())
                    .endDate(request.getEndDate())
                    .car(car.get())
                    .priority(request.getPriority())
                    .type(RepeatedCalendarType.PRICE)
                    .build();
        }
        RepeatedCalendarEntity savedCalendar = repeatedCalendarRepository.save(repeatedCalendar);
        return CustomPriceResponse.builder()
                .id(savedCalendar.getId())
                .carId(savedCalendar.getCar().getId())
                .startDate(savedCalendar.getStartDate())
                .endDate(savedCalendar.getEndDate())
                .value(savedCalendar.getValue())
                .build();
    }

    @Override
    public CustomBusyResponse saveCustomBusy(CustomBusyRequest request) throws Exception {
        Optional<CarEntity> car = carService.findById(request.getCarId());
        if (!car.isPresent()) throw new Exception(ErrorMessage.NO_CAR_WAS_FOUND);
        CarRentalEntity existedRental = carRentalService.findFirstByStartDateBetweenOrEndDateBetween(request.getCarId(),
                request.getStartDate(), request.getEndDate(), request.getStartDate(), request.getEndDate());

        if (existedRental != null) throw new Exception(ErrorMessage.UNABLE_TO_SET_BUSY);

        RepeatedCalendarEntity repeatedCalendar = RepeatedCalendarEntity.builder()
                .value(request.getValue())
                .startDate(request.getStartDate())
                .endDate(request.getEndDate())
                .car(car.get())
                .priority(request.getPriority())
                .type(RepeatedCalendarType.BUSY_DATE)
                .build();
        RepeatedCalendarEntity savedCalendar = repeatedCalendarRepository.save(repeatedCalendar);
        return CustomBusyResponse.builder()
                .id(savedCalendar.getId())
                .carId(savedCalendar.getCar().getId())
                .startDate(savedCalendar.getStartDate())
                .endDate(savedCalendar.getEndDate())
                .value(savedCalendar.getValue())
                .build();
    }

    @Override
    public void deleteCustomPrice(DeleteRepeatedCalendarRequest request) throws Exception {
        RepeatedCalendarEntity repeatedCalendar = repeatedCalendarRepository.findFirstByCarIdAndTypeAndStartDateEqualsAndEndDateEquals(
                request.getCarId(), RepeatedCalendarType.PRICE, request.getStartDate(), request.getEndDate());
        if (repeatedCalendar == null) throw new Exception(ErrorMessage.NO_DATA_WAS_FOUND);
        repeatedCalendarRepository.delete(repeatedCalendar);
    }

    @Override
    public void deleteCustomBusy(DeleteRepeatedCalendarRequest request) throws Exception {
        RepeatedCalendarEntity repeatedCalendar = repeatedCalendarRepository.findFirstByCarIdAndTypeAndStartDateEqualsAndEndDateEquals(
                request.getCarId(), RepeatedCalendarType.BUSY_DATE, request.getStartDate(), request.getEndDate());
        if (repeatedCalendar == null) throw new Exception(ErrorMessage.NO_DATA_WAS_FOUND);
        repeatedCalendarRepository.delete(repeatedCalendar);
    }

    @Override
    public List<CustomPriceResponse> findAllCustomPriceByOwner(String username, Long carId) throws Exception {
        List<RepeatedCalendarEntity> repeatedCalendarList = repeatedCalendarRepository.findAllByCarUserUsernameAndCarIdAndType(username, carId, RepeatedCalendarType.PRICE);

        return repeatedCalendarList.stream().map(i ->
                CustomPriceResponse.builder()
                        .id(i.getId())
                        .carId(i.getCar().getId())
                        .startDate(i.getStartDate())
                        .endDate(i.getEndDate())
                        .value(i.getValue())
                        .build()
        ).collect(Collectors.toList());
    }

    @Override
    public List<CustomBusyResponse> findAllCustomBusyByOwner(String username, Long carId) throws Exception {
        List<RepeatedCalendarEntity> repeatedCalendarList = repeatedCalendarRepository.findAllByCarUserUsernameAndCarIdAndType(username, carId,
                RepeatedCalendarType.BUSY_DATE);

        return repeatedCalendarList.stream().map(i ->
                CustomBusyResponse.builder()
                        .id(i.getId())
                        .carId(i.getCar().getId())
                        .startDate(i.getStartDate())
                        .endDate(i.getEndDate())
                        .value(i.getValue())
                        .build()
        ).collect(Collectors.toList());
    }

    @Override
    public PriceRepeatedCalendarResponse findCustomPriceByDateRange(Long carId, Date startDate, Date endDate) throws Exception {
        Optional<CarEntity> car = carService.findById(carId);
        if (!car.isPresent()) throw new Exception(ErrorMessage.NO_CAR_WAS_FOUND);

        List<DateValueResponse> priceList;

        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        CriteriaQuery<DateValueResponse> query = cb.createQuery(DateValueResponse.class);
        Root<RepeatedCalendarEntity> root = query.from(RepeatedCalendarEntity.class);

        query.where(
                cb.equal(root.get("car").get("id"), carId),
                cb.and(
                        cb.or(
                                cb.greaterThanOrEqualTo(root.get("startDate"), startDate),
                                cb.greaterThanOrEqualTo(root.get("endDate"), endDate)
                        ))
        );
        query.multiselect(
                root.get("startDate"),
                root.get("value")
        );

        TypedQuery<DateValueResponse> typedQuery = entityManager.createQuery(query);
        priceList = (typedQuery.getResultList());

        Double defaultPrice = car.get().getService().getDefaultPrice();

        return PriceRepeatedCalendarResponse.builder()
                .carId(car.get().getId())
                .priceByDays(priceList)
                .defaultPrice(defaultPrice)
                .build();
    }

    @Override
    public RepeatedCalendarDayResponse findByCarIdAndStartDate(RepeatedCalendarDayRequest request) throws Exception {
        RepeatedCalendarEntity repeatedCalendar = repeatedCalendarRepository.findFirstByCarIdAndTypeAndStartDateEquals(request.getCarId(),
                RepeatedCalendarType.PRICE, request.getStartDate());
        if (repeatedCalendar == null) throw new Exception(ErrorMessage.NO_DATA_WAS_FOUND);
        return RepeatedCalendarDayResponse.builder()
                .id(repeatedCalendar.getId())
                .carId(repeatedCalendar.getCar().getId())
                .startDate(repeatedCalendar.getStartDate())
                .endDate(repeatedCalendar.getEndDate())
                .value(repeatedCalendar.getValue())
                .type(repeatedCalendar.getType())
                .build();
    }
}
