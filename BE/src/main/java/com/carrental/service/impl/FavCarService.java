package com.carrental.service.impl;

import com.carrental.entity.FavoriteCarEntity;
import com.carrental.repository.IFavCarRepository;
import com.carrental.service.IFavCarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FavCarService implements IFavCarService {
    @Autowired
    private IFavCarRepository favCarRepository;

    @Override
    public FavoriteCarEntity saveAndFlush(FavoriteCarEntity f) {
        return this.favCarRepository.saveAndFlush(f);
    }

    @Override
    public FavoriteCarEntity findByCarIdAndUserId(Long carId, Long userId) {
        return this.favCarRepository.findByCarIdAndUserId(carId, userId);
    }

    @Override
    public List<FavoriteCarEntity> findAllByUserId(Long userId) {
        return this.favCarRepository.findAllByUserId(userId);
    }

    @Override
    public void deleteById(Long id) {
        this.favCarRepository.deleteById(id);
    }

}
