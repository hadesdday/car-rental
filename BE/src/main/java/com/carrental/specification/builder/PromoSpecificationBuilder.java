package com.carrental.specification.builder;

import com.carrental.entity.PromoEntity;
import com.carrental.specification.PromoSpecification;
import com.carrental.specification.criteria.SearchCriteria;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.Predicate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class PromoSpecificationBuilder {
    private final List<SearchCriteria> params;

    public PromoSpecificationBuilder() {
        params = new ArrayList<SearchCriteria>();
    }
    public PromoSpecificationBuilder with(String key, Object value, String operator){
        params.add(new SearchCriteria(key, value, operator));
        return this;
    }
    public Specification<PromoEntity> build() {
        if (params.size() == 0) {
            return null;
        }
        List<Specification<PromoEntity>> specs = params.stream().map(PromoSpecification::new)
                .collect(Collectors.toList());
        Specification<PromoEntity> result = specs.get(0);
        for (int i = 1; i < specs.size(); i++) {
            result = result.and(specs.get(i));
        }
        return result;
    }
}
