package com.carrental.repository;

import com.carrental.entity.FeatureEntity;
import com.carrental.entity.PromoEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import java.util.Date;
import java.util.List;

public interface IPromoRepository extends JpaRepository<PromoEntity, Long>, JpaSpecificationExecutor<PromoEntity> {

}
