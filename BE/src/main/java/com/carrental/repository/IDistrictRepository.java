package com.carrental.repository;

import com.carrental.entity.DistrictEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface IDistrictRepository extends JpaRepository<DistrictEntity, Long>, JpaSpecificationExecutor<DistrictEntity> {
}
