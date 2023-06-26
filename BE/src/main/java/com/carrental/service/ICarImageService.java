package com.carrental.service;

import com.carrental.entity.CarImagesEntity;

public interface ICarImageService {
    CarImagesEntity findFirstByCarIdAndIsThumbnail(Long carId, Boolean isThumbnail);
}
