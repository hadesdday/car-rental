package com.carrental.repository;

import com.carrental.entity.FeatureEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IFeatureRepository extends JpaRepository<FeatureEntity, Long> {
    List<FeatureEntity> findAllByIdIn(List<Long> ids);
}
