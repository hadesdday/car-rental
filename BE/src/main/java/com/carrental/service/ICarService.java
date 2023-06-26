package com.carrental.service;

import com.carrental.entity.CarEntity;
import com.carrental.requestmodel.CarAdminRequest;
import com.carrental.requestmodel.CarRegisterRequest;
import com.carrental.responsemodel.*;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

import java.util.List;
import java.util.Optional;
import java.util.Set;

public interface ICarService {
    String findByPlate(String plate);

    CarRegisterResponse registerNewCar(CarRegisterRequest request) throws Exception;

    Set<RegisteredCarResponse> findAllRegisteredCar(String username);

    List<CarAdminResponse> findAll(); // for admin

    CarAdminResponse updateCar(CarAdminRequest request) throws Exception;

    List<SearchCarResponse> searchCar(Specification<CarEntity> spec, Pageable pageable);

    Optional<CarEntity> findById(Long id);

    List<CarResponse> findAllByUserId(Long ownerId, Pageable pageable);

    List<CarEntity> findAll(Specification spec, Pageable pageable);
}
