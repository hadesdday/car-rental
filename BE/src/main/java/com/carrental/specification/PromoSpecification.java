package com.carrental.specification;

import com.carrental.entity.PromoEntity;
import com.carrental.specification.criteria.SearchCriteria;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.*;
import java.util.Date;

public class PromoSpecification implements Specification<PromoEntity> {

    private final SearchCriteria criteria;

    public PromoSpecification(SearchCriteria criteria) {
        this.criteria = criteria;
    }

    @Override
    public Predicate toPredicate(Root<PromoEntity> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
        String param = this.criteria.getKey();
        Object value = this.criteria.getValue();
        String operator = this.criteria.getOperator();
        if (operator.equals("like")) {
            return criteriaBuilder.like(root.get(param), "%" + value.toString() + "%");
        } else if (operator.equals("equals")) {
            return criteriaBuilder.equal(root.get(param), value);
        } else if (operator.equals("availableDate")) {
            Expression<Date> startDate = root.get("startDate");
            Expression<Date> endDate = root.get("endDate    ");
            return criteriaBuilder.between(criteriaBuilder.currentDate(), startDate, endDate);
        }else if (operator.equals("greaterThan")) {
            return criteriaBuilder.greaterThan(root.get(param), Integer.valueOf(value.toString()));
        }
        return null;
    }
}
