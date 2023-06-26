package com.carrental.service;

import com.carrental.entity.FavoriteCarEntity;
import com.carrental.repository.IFavCarRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public interface IFavCarService {

    FavoriteCarEntity saveAndFlush(FavoriteCarEntity f);

    FavoriteCarEntity findByCarIdAndUserId(Long carId, Long userId);

    List<FavoriteCarEntity> findAllByUserId(Long userId);

    void deleteById(Long id);
}
