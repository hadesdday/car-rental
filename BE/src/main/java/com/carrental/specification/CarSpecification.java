package com.carrental.specification;

import com.carrental.entity.CarEntity;
import com.carrental.entity.ServiceTypeEntity;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.Expression;
import javax.persistence.criteria.Join;
import javax.persistence.criteria.Predicate;
import java.util.ArrayList;
import java.util.List;

public class CarSpecification {
    public static Specification<CarEntity> hasPlate(String plate) {
        return (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();
            predicates.add(cb.equal(root.get("plate"), plate));
            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }

    public static Specification<CarEntity> hasServiceTypeIdEquals(Long serviceType) {
        return (root, query, cb) -> {
            Join<CarEntity, ServiceTypeEntity> join = root.join("service").join("serviceType");
            return cb.equal(join.get("id"), serviceType);
        };
    }
}
