package com.carrental.controller;

import com.carrental.requestmodel.CarChartStatRequest;
import com.carrental.service.ICarStatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/statistics")
public class CarStatisticController {
    @Autowired
    private ICarStatService statService;

    @GetMapping("/getAll")
    public ResponseEntity<?> getAll(@RequestParam("username") String username) {
        return ResponseEntity.ok(statService.getStatByOwner(username));
    }

    @PostMapping("/getChartData")
    public ResponseEntity<?> getChartDate(@RequestBody CarChartStatRequest req) {
        return ResponseEntity.ok(statService.getChartStats(req.getCategory(), req.getUsername(),
                req.getStartDate(), req.getEndDate()));
    }

    @PostMapping("/getAllChartData")
    public ResponseEntity<?> getAllChartData(@RequestBody CarChartStatRequest request) {
        return ResponseEntity.ok(statService.getChartStatsAdmin(request.getCategory(),
                request.getStartDate(), request.getEndDate()));
    }
}
