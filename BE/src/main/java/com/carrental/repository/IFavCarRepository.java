package com.carrental.repository;

import com.carrental.entity.FavoriteCarEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IFavCarRepository extends JpaRepository<FavoriteCarEntity, Long> {

    FavoriteCarEntity findByCarIdAndUserId(Long carId, Long userId);

    List<FavoriteCarEntity> findAllByUserId(Long userId);
}
