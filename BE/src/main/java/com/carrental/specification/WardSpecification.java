package com.carrental.specification;

import com.carrental.entity.WardEntity;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.Predicate;
import java.util.ArrayList;
import java.util.List;

public class WardSpecification {
    public static Specification<WardEntity> hasDistrictAndProvinceId(Long provinceId, Long districtId) {
        return (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();
            predicates.add(cb.equal(root.get("provinceWard").get("id"), provinceId));
            predicates.add(cb.equal(root.get("district").get("id"), districtId));
            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }
}
