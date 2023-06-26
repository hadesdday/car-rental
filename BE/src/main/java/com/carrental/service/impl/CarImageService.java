package com.carrental.service.impl;

import com.carrental.entity.CarImagesEntity;
import com.carrental.repository.ICarImageRepository;
import com.carrental.service.ICarImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CarImageService implements ICarImageService {
    @Autowired
    private ICarImageRepository carImageRepository;

    @Override
    public CarImagesEntity findFirstByCarIdAndIsThumbnail(Long carId, Boolean isThumbnail) {
        return carImageRepository.findFirstByCarIdAndIsThumbnail(carId, isThumbnail);
    }
}
