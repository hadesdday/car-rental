package com.carrental.specification;

import com.carrental.constance.SystemConstance;
import com.carrental.entity.CarEntity;
import com.carrental.entity.CarRentalEntity;
import com.carrental.entity.ExtraFeeEntity;
import com.carrental.entity.ServiceFeeEntity;
import com.carrental.enums.CarStatus;
import com.carrental.enums.RentalStatus;
import com.carrental.specification.criteria.SearchCriteria;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.*;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

public class SearchCarSpecification implements Specification<CarEntity> {
    private final SearchCriteria criteria;

    public SearchCarSpecification(SearchCriteria criteria) {
        this.criteria = criteria;
    }

    @Override
    public Predicate toPredicate(Root<CarEntity> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
        String key = this.criteria.getKey();
        Object value = this.criteria.getValue();
        String operator = this.criteria.getOperator();

        switch (operator) {
            case "like":
                return criteriaBuilder.like(root.get(key), "%" + value.toString() + "%");
            case "equals":
                return criteriaBuilder.equal(root.get(key), value);
            case "greaterThan":
                return criteriaBuilder.greaterThanOrEqualTo(root.get(key), value.toString());
            case "lessThan":
                return criteriaBuilder.lessThanOrEqualTo(root.get(key), value.toString());
            case "between":
                String[] range = String.valueOf(value).split("-");
                return criteriaBuilder.between(root.get(key), Integer.valueOf(range[0]), Integer.valueOf(range[1]));
            case "address":
                String[] splitWords = value.toString().split(" ");
                List<Predicate> predicates = new ArrayList<>();

                for (String s : splitWords) {
                    predicates.add(criteriaBuilder.like(root.get("address").get("addressName"), "%" + s + "%"));
                }
                return criteriaBuilder.or(predicates.toArray(new Predicate[0]));
//            return criteriaBuilder.like(root.get("address").get("addressName"), "%" + value.toString() + "%");
            case "addressWithDriver":
                String[] addressArray = (String[]) value;
                String[] startPoint = addressArray[0].split(" ");
                String[] endPoint = addressArray[1].split(" ");

                List<Predicate> addressPredicates = new ArrayList<>();

                for (String s : startPoint) {
                    addressPredicates.add(criteriaBuilder.like(root.get("address").get("addressName"), "%" + s + "%"));
                }

                for (String s : endPoint) {
                    addressPredicates.add(criteriaBuilder.like(root.get("address").get("addressName"), "%" + s + "%"));
                }
                return criteriaBuilder.or(addressPredicates.toArray(new Predicate[0]));
            case "brand":
                return criteriaBuilder.equal(root.get("brand").get("id"), Long.valueOf(value.toString()));
            case "discount":
                return criteriaBuilder.isTrue(
                        criteriaBuilder.or(
                                criteriaBuilder.greaterThan(
                                        root.get("service").get("discountByWeek"),
                                        0
                                ),
                                criteriaBuilder.greaterThan(
                                        root.get("service").get("discountByMonth"),
                                        0
                                )
                        )
                );
            case "distanceLimit":
                Join<ServiceFeeEntity, ExtraFeeEntity> joins = root.join("service").join("extraFeeList");
                String[] splitted = value.toString().split("/");
                long limitVal = Long.parseLong(splitted[0]);
                String overLimitFee = splitted[1];
                int overLimitFeeRange;
                if (overLimitFee.contains("<")) {
                    overLimitFeeRange = Integer.parseInt(overLimitFee.split("<")[1]);
                } else if (overLimitFee.contains("FREE")) {
                    overLimitFeeRange = 0;
                } else {
                    overLimitFeeRange = SystemConstance.MAX_OVER_LIMIT_FEE_ALLOWED;
                }

                return criteriaBuilder.and(
                        criteriaBuilder.equal(joins.get("name"), "Giới hạn số KM"),
                        criteriaBuilder.greaterThan(joins.get("limitValue"), limitVal),
                        criteriaBuilder.between(joins.get("fee"), 0, overLimitFeeRange)
                );
            case "noDistanceLimit":
                Join<ServiceFeeEntity, ExtraFeeEntity> seJoin = root.join("service").join("extraFeeList");
                return criteriaBuilder.and(
                        criteriaBuilder.notEqual(seJoin.get("name"), "Giới hạn số KM")
                );
            case "features":
                String[] featureList = String.valueOf(value).split("-");
                List<Long> featureLongList = new ArrayList<>();
                for (String s : featureList) {
                    featureLongList.add(Long.parseLong(s));
                }
                Expression<Long> expression = root.join("features").get("id");
                return expression.in(featureLongList);
            case "active":
                return criteriaBuilder.isTrue(
                        criteriaBuilder.equal(root.get("status"), CarStatus.ACTIVE)
                );
            case "price":
                String[] priceRange = String.valueOf(value).split("-");
                return criteriaBuilder.between(root.get("service").get("defaultPrice"), Integer.valueOf(priceRange[0]), Integer.valueOf(priceRange[1]));
            case "available":
                Date[] dateRange = (Date[]) value;
                Subquery<Long> subquery = query.subquery(Long.class);
                Root<CarRentalEntity> carRentalRoot = subquery.from(CarRentalEntity.class);
                subquery.select(carRentalRoot.get("car").get("id"))
                        .where(criteriaBuilder.and(
//                                        criteriaBuilder.greaterThan(carRentalRoot.get("startDate"), dateRange[0]),
//                                        criteriaBuilder.greaterThan(carRentalRoot.get("startDate"), dateRange[1]),
//                                        criteriaBuilder.greaterThan(carRentalRoot.get("endDate"), dateRange[0]),
//                                        criteriaBuilder.greaterThan(carRentalRoot.get("endDate"), dateRange[1])
                                        criteriaBuilder.or(
                                                criteriaBuilder.and(
                                                        criteriaBuilder.between(carRentalRoot.get("startDate"), dateRange[0], dateRange[1]),
                                                        criteriaBuilder.between(carRentalRoot.get("endDate"), dateRange[0], dateRange[1])
                                                ),
                                                criteriaBuilder.and(
                                                        criteriaBuilder.lessThan(carRentalRoot.get("startDate"), dateRange[0]),
                                                        criteriaBuilder.greaterThan(carRentalRoot.get("endDate"), dateRange[0])
                                                ),
                                                criteriaBuilder.and(
                                                        criteriaBuilder.lessThan(carRentalRoot.get("startDate"), dateRange[1]),
                                                        criteriaBuilder.greaterThan(carRentalRoot.get("endDate"), dateRange[1])
                                                )
                                        ),
                                        criteriaBuilder.equal(carRentalRoot.get("status"), RentalStatus.RENTED)
                                )
                        );
                return criteriaBuilder.not(root.get("id").in(subquery));
            case "type":
                return root.get("model").get("type").in(value);
            case "serviceType":
                return criteriaBuilder.equal(root.get("service").get("serviceType").get("id"), value);
            default:
                return null;
        }
    }
}
