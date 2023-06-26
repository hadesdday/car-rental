package com.carrental.repository;

import com.carrental.entity.WardEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface IWardRepository extends JpaRepository<WardEntity, Long>, JpaSpecificationExecutor<WardEntity> {
}
