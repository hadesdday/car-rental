package com.carrental.service.impl;

import com.carrental.entity.CarEntity;
import com.carrental.entity.CarRatingEntity;
import com.carrental.entity.CarRentalEntity;
import com.carrental.enums.ChartCategory;
import com.carrental.enums.RentalStatus;
import com.carrental.responsemodel.CarChartStatResponse;
import com.carrental.responsemodel.CarChartStatResponse;
import com.carrental.responsemodel.CarOwnerStatResponse;
import com.carrental.service.ICarStatService;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.*;
import java.util.Date;
import java.util.List;

@Service
public class CarStatService implements ICarStatService {
    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public CarOwnerStatResponse getStatByOwner(String username) {
        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        CriteriaQuery<CarOwnerStatResponse> query = cb.createQuery(CarOwnerStatResponse.class);
        Root<CarEntity> root = query.from(CarEntity.class);

        //for avg rating
        Join<CarEntity, CarRatingEntity> carRatingJoin = root.join("ratings");
        Expression<Double> avgRating = cb.avg(carRatingJoin.get("rating"));

        // for total revenue ( all time )
        Subquery<Number> totalCompletedRentalSubquery = query.subquery(Number.class);
        Root<CarRentalEntity> carRentalRoot = totalCompletedRentalSubquery.from(CarRentalEntity.class);
        totalCompletedRentalSubquery.select(cb.sum(carRentalRoot.get("rentalPrice")))
                .where(
                        cb.equal(carRentalRoot.get("car").get("user").get("username"), username),
                        cb.equal(
                                carRentalRoot.get("status"),
                                RentalStatus.COMPLETED
                        )
                );

        //for total rental
        Subquery<Long> totalRentalSubquery = query.subquery(Long.class);
        Root<CarRentalEntity> totalRentalRoot = totalRentalSubquery.from(CarRentalEntity.class);
        totalRentalSubquery.select(cb.count(totalRentalRoot))
                .where(
                        cb.equal(totalRentalRoot.get("car").get("user").get("username"), username)
                );

        //for total car
        Subquery<Long> totalCarSubquery = query.subquery(Long.class);
        Root<CarEntity> totalCarRoot = totalCarSubquery.from(CarEntity.class);
        totalCarSubquery.select(cb.count(totalCarRoot))
                .where(
                        cb.equal(totalCarRoot.get("user").get("username"), username)
                );

        //for accepted rental rating
        Subquery<Long> totalAcceptedRentalSubquery = query.subquery(Long.class);
        Root<CarRentalEntity> totalAcceptedRentalRoot = totalAcceptedRentalSubquery.from(CarRentalEntity.class);
        totalAcceptedRentalSubquery.select(cb.count(totalAcceptedRentalRoot))
                .where(
                        cb.equal(totalAcceptedRentalRoot.get("car").get("user").get("username"), username),
                        cb.greaterThanOrEqualTo(totalAcceptedRentalRoot.get("status"), RentalStatus.ACCEPTED)
                );
        Expression<Number> acceptedRating = cb.quot(totalAcceptedRentalSubquery.getSelection(), totalRentalSubquery.getSelection());
        Expression<Number> acceptedRatingInPercentage = cb.prod(acceptedRating, 100);
        Expression<Long> acceptedRatingInLong = acceptedRatingInPercentage.as(Long.class);

        //for cancel rental rating
        Subquery<Long> totalCancelledRentalSubquery = query.subquery(Long.class);
        Root<CarRentalEntity> totalCancelledRoot = totalCancelledRentalSubquery.from(CarRentalEntity.class);
        totalCancelledRentalSubquery.select(cb.count(totalCancelledRoot))
                .where(
                        cb.equal(totalCancelledRoot.get("car").get("user").get("username"), username),
                        cb.lessThanOrEqualTo(totalCancelledRoot.get("status"), RentalStatus.REJECTED)
                );
        Expression<Number> cancelledRating = cb.quot(totalCancelledRentalSubquery.getSelection(), totalRentalSubquery.getSelection());
        Expression<Number> cancelledRatingInPercentage = cb.prod(cancelledRating, 100);
        Expression<Long> cancelledRatingInLong = cancelledRatingInPercentage.as(Long.class);

        query.multiselect(
                cb.coalesce(avgRating, 0),
                cb.coalesce(totalCompletedRentalSubquery.getSelection(), 0),
                cb.coalesce(totalRentalSubquery.getSelection(), 0),
                cb.coalesce(totalCarSubquery.getSelection(), 0),
                cb.coalesce(acceptedRatingInLong, 0),
                cb.coalesce(cancelledRatingInLong, 0)
        ).distinct(true);
        query.where(
                cb.equal(root.get("user").get("username"), username)
        );

        TypedQuery<CarOwnerStatResponse> typedQuery = entityManager.createQuery(query);
        return typedQuery.getSingleResult();
    }

    @Override
    public List<CarChartStatResponse> getChartStats(ChartCategory category, String username, Date startDate, Date endDate) {
        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        CriteriaQuery<CarChartStatResponse> query = cb.createQuery(CarChartStatResponse.class);
        Root<CarEntity> root = query.from(CarEntity.class);

        Join<CarEntity, CarRentalEntity> carRentalJoin = root.join("rentals");
        carRentalJoin.on(
                cb.equal(carRentalJoin.get("status"), RentalStatus.COMPLETED)
        );

        Expression<Integer> month = cb.function("month", Integer.class, carRentalJoin.get("startDate"));
        Expression<Integer> year = cb.function("year", Integer.class, carRentalJoin.get("startDate"));
        Expression<Double> value;
        if (category == ChartCategory.REVENUE) {
            value = cb.sum(carRentalJoin.get("rentalPrice"));
        } else {
            value = cb.count(carRentalJoin).as(Double.class);
        }

        query.multiselect(
                month,
                year,
                value
        );
        query.where(
                cb.or(
                        cb.between(carRentalJoin.get("startDate"), startDate, endDate),
                        cb.between(carRentalJoin.get("endDate"), startDate, endDate)
                ),
                cb.equal(root.get("user").get("username"), username)
        );
        query.groupBy(
                cb.function("month", Integer.class, carRentalJoin.get("startDate")),
                cb.function("year", Integer.class, carRentalJoin.get("startDate"))
        );
        TypedQuery<CarChartStatResponse> typedQuery = entityManager.createQuery(query);
        return typedQuery.getResultList();
    }

    @Override
    public List<CarChartStatResponse> getChartStatsAdmin(ChartCategory category, Date startDate, Date endDate) {
        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        CriteriaQuery<CarChartStatResponse> query = cb.createQuery(CarChartStatResponse.class);
        Root<CarEntity> root = query.from(CarEntity.class);

        Join<CarEntity, CarRentalEntity> carRentalJoin = root.join("rentals");
        carRentalJoin.on(
                cb.equal(carRentalJoin.get("status"), RentalStatus.COMPLETED)
        );

        Expression<Integer> month = cb.function("month", Integer.class, carRentalJoin.get("startDate"));
        Expression<Integer> year = cb.function("year", Integer.class, carRentalJoin.get("startDate"));
        Expression<Double> value;
        if (category == ChartCategory.REVENUE) {
            value = cb.sum(carRentalJoin.get("rentalPrice"));
        } else {
            value = cb.count(carRentalJoin).as(Double.class);
        }

        query.multiselect(
                month,
                year,
                value
        );
        query.where(
                cb.or(
                        cb.between(carRentalJoin.get("startDate"), startDate, endDate),
                        cb.between(carRentalJoin.get("endDate"), startDate, endDate)
                )
        );
        query.groupBy(
                cb.function("month", Integer.class, carRentalJoin.get("startDate")),
                cb.function("year", Integer.class, carRentalJoin.get("startDate"))
        );
        TypedQuery<CarChartStatResponse> typedQuery = entityManager.createQuery(query);
        return typedQuery.getResultList();
    }


}
