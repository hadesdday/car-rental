package com.carrental.controller;

import com.carrental.constance.SystemConstance;
import com.carrental.entity.CarEntity;
import com.carrental.entity.CarRentalEntity;
import com.carrental.entity.FavoriteCarEntity;
import com.carrental.entity.PromoEntity;
import com.carrental.enums.RentalStatus;
import com.carrental.requestmodel.CarAdminRequest;
import com.carrental.requestmodel.CarRegisterRequest;
import com.carrental.requestmodel.FilterRequest;
import com.carrental.requestmodel.SearchCarRequest;
import com.carrental.responsemodel.CarResponse;
import com.carrental.service.ICarRentalService;
import com.carrental.service.ICarService;
import com.carrental.service.IFavCarService;
import com.carrental.service.IPromoService;
import com.carrental.service.impl.FavCarService;
import com.carrental.specification.CarSpecification;
import com.carrental.specification.builder.SearchCarBuilder;
import com.carrental.utils.ModelMapperUtils;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.ResponseEntity;
import org.springframework.util.ObjectUtils;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/cars")
@CrossOrigin("http://localhost:4200")
public class CarController {
    @Autowired
    private ICarService service;

    @Autowired
    private ModelMapperUtils mpu;

    @Autowired
    private IFavCarService favCarService;
    @Autowired
    private IPromoService promoService;

    @Autowired
    private ICarRentalService carRentalService;


    @PostMapping("/registerNewCar")
    public ResponseEntity<?> registerNewCar(@RequestBody CarRegisterRequest request) {
        try {
            return ResponseEntity.ok().body(service.registerNewCar(request));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/findRegisteredCar")
    public ResponseEntity<?> findRegisteredCar(@RequestParam("username") String username) {
        try {
            return ResponseEntity.ok().body(service.findAllRegisteredCar(username));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/findAll")
    public ResponseEntity<?> findAll() {
        try {
            return ResponseEntity.ok().body(service.findAll());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/updateCar")
    public ResponseEntity<?> updateCar(@RequestBody CarAdminRequest request) {
        try {
            return ResponseEntity.ok().body(service.updateCar(request));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/searchCar")
    public ResponseEntity<?> searchCar(@RequestBody SearchCarRequest request) {
        SearchCarBuilder builder = new SearchCarBuilder();
        builder
                .with("", "", "active")
        ;

        if (request.getServiceType() != 3) {
            builder.with("", request.getAddress(), "address");
        } else {
            builder.with("", request.getAddressWithDriver(), "addressWithDriver");
        }

        builder.with("", request.getServiceType(), "serviceType");

        if (request.getSeats() != null) {
            String value = request.getSeats();//already in between format (x-x)
            if (value.contains(">")) {
                value = value.split(">")[1] + "-" + SystemConstance.MAX_SEAT_ALLOWED;
            } else if (value.contains("<")) {
                value = "0-" + value.split("<")[1];
            }
            builder.with("seats", value, "between");
        }

        if (request.getYearOfManufacture() != null) {
            String value = request.getYearOfManufacture();//already in between format (x-x)
            if (value.contains(">")) {
                value = value.split(">")[1] + "-" + SystemConstance.MAX_YEAR_ALLOWED;
            } else if (value.contains("<")) {
                value = "0-" + value.split("<")[1];
            }
            builder.with("yearOfManufacture", value, "between");
        }

        if (request.getIsDiscount() != null) {
            builder.with("", "", "discount");
        }

        String priceRange = request.getPrice();
        if (priceRange.contains("MAX")) {
            priceRange = priceRange.split("-")[0] + "-" + SystemConstance.MAX_PRICE_ALLOWED;
        }
        builder.with("", priceRange, "price");

        if (!ObjectUtils.isEmpty(request.getBrand())) {
            builder.with("", request.getBrand(), "brand");
        }

        if (!ObjectUtils.isEmpty(request.getDistanceLimit())) {
            if (request.getDistanceLimit().equals("noDistanceLimit"))
                builder.with("", "", "noDistanceLimit");
            else
                builder.with("", request.getDistanceLimit(), "distanceLimit");
        }

        if (!ObjectUtils.isEmpty(request.getFeatures())) {
            StringBuilder featureString = new StringBuilder();
            featureString.append(request.getFeatures().stream().map(Object::toString).reduce((i, j) -> i + "-" + j).get());
            builder.with("", featureString, "features");
        }

        if (!ObjectUtils.isEmpty(request.getIsFastRent())) {
            builder.with("isFastRent", request.getIsFastRent(), "equals");
        }

        Date[] dateRange = {request.getStartDate(), request.getEndDate()};
        builder.with("", dateRange, "available");

        if (!ObjectUtils.isEmpty(request.getType())) {
            builder.with("", request.getType(), "type");
        }

        if (!ObjectUtils.isEmpty(request.getTransmission())) {
            builder.with("transmission", request.getTransmission(), "equals");
        }

        if (!ObjectUtils.isEmpty(request.getFuel())) {
            builder.with("fuel", request.getFuel(), "equals");
        }

        if (!ObjectUtils.isEmpty(request.getFuelConsumption())) {
            builder.with("fuelConsumption", request.getFuelConsumption(), "lessThan");
        }

        Specification<CarEntity> spec = builder.build();

        Sort sortBy;
        switch (request.getSortBy()) {
            case 1:
                sortBy = Sort.by("service.defaultPrice").ascending();
                break;
            case 2:
                sortBy = Sort.by("service.defaultPrice").descending();
                break;
            case 3:
                sortBy = Sort.by("avgRating").descending();
                break;
            default:
                sortBy = Sort.unsorted();
                break;
        }

        Pageable pageable = PageRequest.of(request.getPageNo(), 10, sortBy);
        return ResponseEntity.ok(service.searchCar(spec, pageable));
    }

    @PostMapping("/{ownerId}")
    public ResponseEntity<List<CarResponse>> findAll(@PathVariable Long ownerId, @RequestBody FilterRequest filterRequest) {
        Pageable pageable = PageRequest.of(filterRequest.getPaging().getPage(), filterRequest.getPaging().getSize());
        List<CarResponse> result = this.service.findAllByUserId(ownerId, pageable);
        return ResponseEntity.ok(result);
    }

    @GetMapping("/detail/{carId}")
    public ResponseEntity<CarResponse> findOne(@PathVariable Long carId, @RequestParam("startTime") Long startTime, @RequestParam("endTime") Long endTime, @RequestParam(value = "promoId", required = false) Long promoId, @RequestParam(required = false) Long userId) {
        CarEntity carEntity = this.service.findById(carId).get();
        CarResponse result;
        if (carEntity != null) {
            result = this.mpu.map(carEntity, CarResponse.class);
            boolean isDenyRent = false;
            List<CarRentalEntity> foundRentedCars = this.carRentalService.findAllByCarIdAndStatus(carId, RentalStatus.RENTED);
            System.out.println("foundRentedCars " + foundRentedCars.size());
            for (CarRentalEntity foundRentedCar : foundRentedCars) {
                System.out.println(foundRentedCar.getCar().getId());
                Long sTime = foundRentedCar.getStartDate().getTime();
                Long eTime = foundRentedCar.getEndDate().getTime();
                boolean isInSide = startTime > sTime && endTime < eTime;
                boolean isInLeftSide = startTime < sTime && endTime > sTime;
                boolean isInRightSide = startTime < endTime && endTime > eTime;
                if(isInSide || isInLeftSide || isInRightSide){
                    isDenyRent = true;
                    break;
                }
            }
            System.out.println(isDenyRent);
            result.setIsDenyRent(isDenyRent);
            if (userId != null) {
                FavoriteCarEntity favoriteCar = this.favCarService.findByCarIdAndUserId(carEntity.getId(), userId);
                if (favoriteCar != null) {
                    result.setIsFav(true);
                }
            }
            Double defaultPrice = result.getService().getDefaultPrice();
            Long days = (endTime - startTime) / 86400000;
            days = (endTime - startTime) % 86400000 > 0? days + 1: days;
            Double newDefaultPrice;
            Double rentalFee;
            Integer discount = 0;
            if(days > 7 && days <= 31){
                discount = result.getService().getDiscountByWeek();
            }else if(days > 31){
                discount = result.getService().getDiscountByMonth();
            }
            Double discountPrice = 0.0;
            if(promoId != null){
                System.out.println(promoId);
                PromoEntity foundPromo = this.promoService.findById(promoId);
                if(foundPromo != null){
                    discountPrice = defaultPrice * foundPromo.getDiscountPercent() / 100;
                    System.out.println(discountPrice);
                }
            }
            newDefaultPrice = defaultPrice * (100 - discount) / 100;
            Double insuranceFee = defaultPrice * 0.12;
            Double serviceFee = insuranceFee;
            rentalFee = newDefaultPrice + insuranceFee + serviceFee - discountPrice;
            result.setRentalFee(rentalFee);
            Double total = days * rentalFee;
            result.getService().setDefaultPrice(newDefaultPrice);
            result.setRentalDay(days);
            result.setRentalFee(rentalFee);
            result.setInsuranceFee(insuranceFee);
            result.setAppServiceFee(serviceFee);
            result.setTotalFee(total);
            result.setDiscountPrice(discountPrice);
        } else {
            return null;
        }
        return ResponseEntity.ok(result);
    }

    @GetMapping("/feature/service-type/{serviceTypeId}")
    public ResponseEntity findFeatureCars(@PathVariable Long serviceTypeId){
        Specification<CarEntity> specification = CarSpecification.hasServiceTypeIdEquals(serviceTypeId);
        Sort sort = Sort.by(Sort.Direction.DESC, "avgRating");
        PageRequest pageRequest = PageRequest.of(0, 10, sort);
        System.out.println(this.service.findAll(specification, pageRequest).size());
        return ResponseEntity.ok(this.mpu.mapAll(this.service.findAll(specification, pageRequest), CarResponse.class));
    }
}
