package com.carrental.service.impl;

import com.carrental.constance.ErrorMessage;
import com.carrental.entity.*;
import com.carrental.enums.CarStatus;
import com.carrental.enums.RentalStatus;
import com.carrental.repository.ICarRentalRepository;
import com.carrental.requestmodel.UpdateRentalStatusRequest;
import com.carrental.responsemodel.*;
import com.carrental.service.ICarImageService;
import com.carrental.service.ICarRentalService;
import com.carrental.service.IExtraFeeService;
import com.carrental.utils.ModelMapperUtils;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.*;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CarRentalService implements ICarRentalService {
    @Autowired
    private ICarRentalRepository carRentalRepository;
    @Autowired
    private IExtraFeeService extraFeeService;
    @Autowired
    private ICarImageService imageService;
    @PersistenceContext
    private EntityManager entityManager;

    @Autowired
    private ModelMapperUtils mpu;

    @Override
    public List<RentalListingResponse> findByOwner(String username) {
        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        CriteriaQuery<RentalListingResponse> query = cb.createQuery(RentalListingResponse.class);
        Root<CarEntity> root = query.from(CarEntity.class);

        //car user join
        Join<CarEntity, UserEntity> carUserJoin = root.join("user", JoinType.INNER);
        carUserJoin.on(
                cb.equal(carUserJoin.get("username"), username)
        );

        Join<CarEntity, CarRentalEntity> carRentalJoin = root.join("rentals", JoinType.INNER);

        //car images join
        Join<CarEntity, CarImagesEntity> imageJoin = root.join("images", JoinType.LEFT);
        imageJoin.on(
                cb.and(
                        cb.equal(imageJoin.get("car"), root),
                        cb.isTrue(imageJoin.get("isThumbnail"))
                )
        );

//        long, java.lang.String, java.lang.String, int, java.lang.String, java.lang.String, double,
//        double, java.util.Date, java.util.Date
        //car rating join
        Join<CarEntity, CarRatingEntity> carRatingJoin = root.join("ratings", JoinType.LEFT);
        query.multiselect(
                carRentalJoin.get("id"),
                imageJoin.get("imageUrl"),
                root.get("model").get("name"),
                root.get("yearOfManufacture"),
                root.get("plate"),
                carRentalJoin.get("user").get("fullName"),
                cb.coalesce(cb.avg(carRatingJoin.get("rating")), 0.0),
                cb.coalesce(carRentalJoin.get("rentalPrice"), 0.0),
                carRentalJoin.get("startDate"),
                carRentalJoin.get("endDate")
        ).distinct(true);
        query.groupBy(
                carRentalJoin.get("id"),
                imageJoin.get("imageUrl"),
                carRentalJoin.get("user").get("fullName"),
                carRentalJoin.get("rentalPrice"),
                carRentalJoin.get("startDate"),
                carRentalJoin.get("endDate")
        );
        TypedQuery<RentalListingResponse> typedQuery = entityManager.createQuery(query);
        return typedQuery.getResultList();
    }

    @Override
    public RentalDetailsResponse findById(Long id) throws Exception {
//        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
//        CriteriaQuery<RentalDetailsResponse> query = cb.createQuery(RentalDetailsResponse.class);
//        Root<CarEntity> root = query.from(CarEntity.class);
//
//        Join<CarEntity, CarRentalEntity> carRentalJoin = root.join("rentals", JoinType.INNER);
//        //car images join
//        Join<CarEntity, CarImagesEntity> imageJoin = root.join("images", JoinType.LEFT);
//        imageJoin.on(
//                cb.and(
//                        cb.equal(imageJoin.get("car"), root),
//                        cb.isTrue(imageJoin.get("isThumbnail"))
//                )
//        );
//
//        //car rating join
//        Join<CarEntity, CarRatingEntity> carRatingJoin = root.join("ratings", JoinType.LEFT);
//
//        Join<CarEntity, ServiceFeeEntity> carServiceFeeJoin = root.join("service");
//        Join<ServiceFeeEntity, ExtraFeeEntity> extraFeeJoin = carServiceFeeJoin.join("extraFeeList");
//
//        query.multiselect(
//                carRentalJoin.get("id"),
//                root.get("model").get("name"),
//                carRentalJoin.get("startDate"),
//                carRentalJoin.get("endDate"),
//                cb.coalesce(cb.avg(carRatingJoin.get("rating")), 0),
//                carRentalJoin.get("user").get("fullName"),
//                carRentalJoin.get("user").get("phone"),
//                carRentalJoin.get("status"),
//                cb.coalesce(extraFeeJoin.get("limitValue"), 0),
//                carRentalJoin.get("rentalPrice"),
//                imageJoin.get("imageUrl"),
//                carRentalJoin.get("createdDate")
//        ).distinct(true);
//
//        query.where(
//                cb.and(
//                        cb.equal(carRentalJoin.get("id"), id),
//                        cb.equal(extraFeeJoin.get("name"), "Giới hạn số KM")
//                )
//        );
//
//        query.groupBy(
//                root.get("id"),
//                imageJoin.get("imageUrl"),
//                extraFeeJoin.get("limitValue")
//        );
//
//        TypedQuery<RentalDetailsResponse> typedQuery = entityManager.createQuery(query);
//        return typedQuery.getSingleResult();

        Optional<CarRentalEntity> foundRental = carRentalRepository.findById(id);
        if (!foundRental.isPresent()) {
            throw new Exception("No record found");
        }

        CarRentalEntity rental = foundRental.get();
        return RentalDetailsResponse.builder()
                .id(rental.getId())
                .model(rental.getCar().getModel().getName())
                .startDate(rental.getStartDate())
                .endDate(rental.getEndDate())
                .avgRating(rental.getCar().getAvgRating())
                .customerName(rental.getUser().getFullName())
                .customerPhone(rental.getUser().getPhone())
                .status(rental.getStatus())
                .distanceLimit(extraFeeService.findDistanceLimit(rental.getCar().getService().getId()))
                .price(rental.getRentalPrice())
                .bannerUrl(imageService.findFirstByCarIdAndIsThumbnail(rental.getCar().getId(), true).getImageUrl())
                .createdDate(rental.getCreatedDate())
                .build();
    }

    @Override
    public UpdateRentalStatusResponse acceptRental(UpdateRentalStatusRequest request) throws Exception {
        Optional<CarRentalEntity> optionalRental = carRentalRepository.findById(request.getId());
        if (!optionalRental.isPresent()) throw new Exception(ErrorMessage.NO_RENTAL_WAS_FOUND);
        CarRentalEntity rentalEntity = optionalRental.get();
        CarEntity carEntity = rentalEntity.getCar();
        if (carEntity.getStatus() == CarStatus.BANNED ||
                carEntity.getStatus() == CarStatus.PENDING_APPROVAL)
            throw new Exception(ErrorMessage.UNABLE_TO_UPDATE_STATUS);
        carEntity.setStatus(CarStatus.RENTED);
        rentalEntity.setStatus(RentalStatus.ACCEPTED);
        rentalEntity.setCar(carEntity);
        rentalEntity.setModifiedBy(request.getModifiedBy());
        CarRentalEntity updatedRental = carRentalRepository.save(rentalEntity);
        return UpdateRentalStatusResponse.builder()
                .id(updatedRental.getId())
                .status(updatedRental.getStatus())
                .modifiedBy(updatedRental.getModifiedBy())
                .build();
    }

    @Override
    public UpdateRentalStatusResponse rejectRental(UpdateRentalStatusRequest request) throws Exception {
        Optional<CarRentalEntity> optionalRental = carRentalRepository.findById(request.getId());
        if (!optionalRental.isPresent()) throw new Exception(ErrorMessage.NO_RENTAL_WAS_FOUND);
        CarRentalEntity rentalEntity = optionalRental.get();
        CarEntity carEntity = rentalEntity.getCar();
        if (carEntity.getStatus() == CarStatus.BANNED ||
                carEntity.getStatus() == CarStatus.PENDING_APPROVAL)
            throw new Exception(ErrorMessage.UNABLE_TO_UPDATE_STATUS);
        rentalEntity.setStatus(RentalStatus.REJECTED);
        rentalEntity.setModifiedBy(request.getModifiedBy());
        CarRentalEntity updatedRental = carRentalRepository.save(rentalEntity);
        return UpdateRentalStatusResponse.builder()
                .id(updatedRental.getId())
                .status(updatedRental.getStatus())
                .modifiedBy(updatedRental.getModifiedBy())
                .build();
    }

    @Override
    public UpdateRentalStatusResponse confirmDeliveredCarToRenter(UpdateRentalStatusRequest request) throws Exception {
        Optional<CarRentalEntity> optionalRental = carRentalRepository.findById(request.getId());
        if (!optionalRental.isPresent()) throw new Exception(ErrorMessage.NO_RENTAL_WAS_FOUND);
        CarRentalEntity rentalEntity = optionalRental.get();
        CarEntity carEntity = rentalEntity.getCar();
        if (carEntity.getStatus() == CarStatus.BANNED ||
                carEntity.getStatus() == CarStatus.PENDING_APPROVAL)
            throw new Exception(ErrorMessage.UNABLE_TO_UPDATE_STATUS);
        rentalEntity.setStatus(RentalStatus.RENTED);
        rentalEntity.setModifiedBy(request.getModifiedBy());
        CarRentalEntity updatedRental = carRentalRepository.save(rentalEntity);
        return UpdateRentalStatusResponse.builder()
                .id(updatedRental.getId())
                .status(updatedRental.getStatus())
                .modifiedBy(updatedRental.getModifiedBy())
                .build();
    }

    @Override
    public UpdateRentalStatusResponse completeRental(UpdateRentalStatusRequest request) throws Exception {
        Optional<CarRentalEntity> optionalRental = carRentalRepository.findById(request.getId());
        if (!optionalRental.isPresent()) throw new Exception(ErrorMessage.NO_RENTAL_WAS_FOUND);
        CarRentalEntity rentalEntity = optionalRental.get();
        CarEntity carEntity = rentalEntity.getCar();
        if (carEntity.getStatus() == CarStatus.BANNED ||
                carEntity.getStatus() == CarStatus.PENDING_APPROVAL)
            throw new Exception(ErrorMessage.UNABLE_TO_UPDATE_STATUS);
        rentalEntity.setStatus(RentalStatus.COMPLETED);
        rentalEntity.setModifiedBy(request.getModifiedBy());
        CarRentalEntity updatedRental = carRentalRepository.save(rentalEntity);
        return UpdateRentalStatusResponse.builder()
                .id(updatedRental.getId())
                .status(updatedRental.getStatus())
                .modifiedBy(updatedRental.getModifiedBy())
                .build();
    }

    @Override
    public long countByStatusAndCarId(RentalStatus status, long id) {
        return carRentalRepository.countByStatusAndCarId(status, id);
    }

    @Override
    public List<CalendarListingResponse> findCalendarByOwner(String username) {
        return carRentalRepository.getAllByCarUserUsernameAndStatusIsBetween(username, RentalStatus.PENDING, RentalStatus.RENTED)
                .stream().map(
                        i -> CalendarListingResponse.builder()
                                .startDate(i.getStartDate())
                                .endDate(i.getEndDate())
                                .yearOfManufacture(i.getCar().getYearOfManufacture())
                                .modelName(i.getCar().getModel().getName())
                                .rentalPrice(i.getRentalPrice())
                                .plate(i.getCar().getPlate())
                                .status(i.getStatus())
                                .build()
                ).collect(Collectors.toList());
    }

    @Override
    public List<CalendarListingResponse> findCalendarByOwnerAndCarId(String username, Long carId) {
        return carRentalRepository.getAllByCarUserUsernameAndCarIdAndStatusIsBetween(username, carId,
                        RentalStatus.PENDING, RentalStatus.RENTED)
                .stream().map(
                        i -> CalendarListingResponse.builder()
                                .startDate(i.getStartDate())
                                .endDate(i.getEndDate())
                                .yearOfManufacture(i.getCar().getYearOfManufacture())
                                .modelName(i.getCar().getModel().getName())
                                .rentalPrice(i.getRentalPrice())
                                .plate(i.getCar().getPlate())
                                .status(i.getStatus())
                                .build()
                ).collect(Collectors.toList());
    }

    @Override
    public CarRentalEntity findFirstByStartDateBetweenOrEndDateBetween(Long carId, Date date1, Date date2, Date date3, Date date4) {
        return carRentalRepository.findFirstByCarIdAndStatusBetweenAndStartDateBetweenOrEndDateBetween(carId,
                RentalStatus.PENDING, RentalStatus.RENTED, date1, date2, date3, date4);
    }

    @Override
    public List<RentalCarResponse> findAllByUserIdAndStatus(Long id, RentalStatus rentalStatus) {
        List<CarRentalEntity> foundRentalCarsEntity = this.carRentalRepository.findAllByUserIdAndStatus(id, rentalStatus);
        List<RentalCarResponse> result = this.mpu.mapAll(foundRentalCarsEntity, RentalCarResponse.class);
        return result;
    }

    @Override
    public CarRentalEntity saveAndFlush(CarRentalEntity carRentalEntity) {
        return this.carRentalRepository.saveAndFlush(carRentalEntity);
    }

    @Override
    public List<CarRentalEntity> findAllByCarIdAndStatus(Long carId, RentalStatus rentalStatus) {
        return this.carRentalRepository.findAllByCarIdAndStatus(carId, rentalStatus);
    }


}
