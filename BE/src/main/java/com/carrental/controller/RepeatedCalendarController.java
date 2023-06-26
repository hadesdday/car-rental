package com.carrental.controller;

import com.carrental.requestmodel.*;
import com.carrental.responsemodel.APIResponse;
import com.carrental.service.IRepeatedCalendarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/calendar")
public class RepeatedCalendarController {
    @Autowired
    private IRepeatedCalendarService repeatedCalendarService;

    @GetMapping("/getCalendar")
    public ResponseEntity<?> getCalendar(@RequestParam("username") String username, @RequestParam("carId") Long carId) {
        try {
            return ResponseEntity.ok(repeatedCalendarService.findAllCustomPriceByOwner(username, carId));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/getBusyCalendar")
    public ResponseEntity<?> getBusyCalendar(@RequestParam("username") String username, @RequestParam("carId") Long carId) {
        try {
            return ResponseEntity.ok(repeatedCalendarService.findAllCustomBusyByOwner(username, carId));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/saveCustomPrice")
    public ResponseEntity<?> addNewCustomPrice(@RequestBody CustomPriceRequest request) {
        try {
            return ResponseEntity.ok(repeatedCalendarService.saveCustomPrice(request));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/saveCustomBusy")
    public ResponseEntity<?> addNewCustomBusy(@RequestBody CustomBusyRequest request) {
        try {
            return ResponseEntity.ok(repeatedCalendarService.saveCustomBusy(request));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/getPriceByDateRange")
    public ResponseEntity<?> getPriceByDateRange(@RequestBody PriceRepeatedCalendarRequest request) {
        try {
            return ResponseEntity.ok(repeatedCalendarService.findCustomPriceByDateRange(request.getCarId(), request.getStartDate(), request.getEndDate()));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/getPriceByDate")
    public ResponseEntity<?> getPriceByDate(@RequestBody RepeatedCalendarDayRequest request) {
        try {
            return ResponseEntity.ok(repeatedCalendarService.findByCarIdAndStartDate(request));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/deleteCustomPrice")
    public ResponseEntity<?> deleteCustomPrice(@RequestBody DeleteRepeatedCalendarRequest request) {
        try {
            repeatedCalendarService.deleteCustomPrice(request);
            APIResponse response = new APIResponse("Deleted", "Xóa điều chỉnh thành công", 200);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/deleteCustomBusy")
    public ResponseEntity<?> deleteCustomBusy(@RequestBody DeleteRepeatedCalendarRequest request) {
        try {
            repeatedCalendarService.deleteCustomBusy(request);
            APIResponse response = new APIResponse("Deleted", "Xóa điều chỉnh thành công", 200);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

}
