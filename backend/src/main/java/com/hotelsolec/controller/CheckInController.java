package com.hotelsolec.controller;

import com.hotelsolec.dto.ApiResponse;
import com.hotelsolec.entity.CheckIn;
import com.hotelsolec.service.CheckInService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/checkins")
@CrossOrigin(origins = "*")
public class CheckInController {

    @Autowired
    private CheckInService checkInService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<CheckIn>>> getAll() {
        List<CheckIn> checkIns = checkInService.findAll();
        return ResponseEntity.ok(ApiResponse.success(checkIns));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<CheckIn>> getById(@PathVariable Long id) {
        CheckIn checkIn = checkInService.findById(id);
        return ResponseEntity.ok(ApiResponse.success(checkIn));
    }

    @GetMapping("/hoy")
    public ResponseEntity<ApiResponse<List<CheckIn>>> getHoy() {
        List<CheckIn> checkIns = checkInService.findCheckInsDeHoy();
        return ResponseEntity.ok(ApiResponse.success(checkIns));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<CheckIn>> create(@Valid @RequestBody CheckIn checkIn) {
        CheckIn created = checkInService.create(checkIn);
        return ResponseEntity.ok(ApiResponse.success("Check-in realizado exitosamente", created));
    }
}
