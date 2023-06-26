package com.carrental.repository;

import com.carrental.entity.TravelTypeEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ITravelTypeRepository extends JpaRepository<TravelTypeEntity, Long> {
}
