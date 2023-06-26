package com.carrental.specification.builder;

import com.carrental.entity.CarEntity;
import com.carrental.specification.SearchCarSpecification;
import com.carrental.specification.criteria.SearchCriteria;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class SearchCarBuilder {
    private final List<SearchCriteria> params;

    public SearchCarBuilder() {
        this.params = new ArrayList<>();
    }

    public SearchCarBuilder with(String key, Object value, String operator) {
        params.add(new SearchCriteria(key, value, operator));
        return this;
    }

    public Specification<CarEntity> build() {
        if (params.size() == 0) return null;
        List<Specification<CarEntity>> specs = params.stream().map(SearchCarSpecification::new)
                .collect(Collectors.toList());
        Specification<CarEntity> result = specs.get(0);
        for (int i = 1; i < specs.size(); i++) {
            result = result.and(specs.get(i));
        }
        return result;
    }
}
