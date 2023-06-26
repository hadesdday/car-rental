package com.carrental.repository;

import com.carrental.entity.CarEntity;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ICarRepository extends JpaRepository<CarEntity, Long>, JpaSpecificationExecutor<CarEntity> {
    CarEntity findFirstByPlateEqualsIgnoreCase(String plate);

    List<CarEntity> findAllByUserId(Long ownerId, Pageable pageable);

}
