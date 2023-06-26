package com.carrental.repository;

import com.carrental.entity.CarImagesEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ICarImageRepository extends JpaRepository<CarImagesEntity, Long> {
    CarImagesEntity findFirstByCarIdAndIsThumbnail(Long carId, Boolean isThumbnail);
}
