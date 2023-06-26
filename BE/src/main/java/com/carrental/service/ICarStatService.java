package com.carrental.service;

import com.carrental.enums.ChartCategory;
import com.carrental.responsemodel.CarChartStatResponse;
import com.carrental.responsemodel.CarOwnerStatResponse;

import java.util.Date;
import java.util.List;

public interface ICarStatService {
    CarOwnerStatResponse getStatByOwner(String username);

    List<CarChartStatResponse> getChartStats(ChartCategory category, String username, Date startDate, Date endDate);

    List<CarChartStatResponse> getChartStatsAdmin(ChartCategory category, Date startDate, Date endDate);
}
