package com.carrental.specification;

import com.carrental.entity.DistrictEntity;
import org.springframework.data.jpa.domain.Specification;

public class DistrictSpecification {
    public static Specification<DistrictEntity> hasProvinceId(Long provinceId) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("province").get("id"), provinceId);
    }

}
