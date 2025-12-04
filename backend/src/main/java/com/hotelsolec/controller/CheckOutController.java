package com.hotelsolec.controller;

import com.hotelsolec.dto.ApiResponse;
import com.hotelsolec.entity.CheckOut;
import com.hotelsolec.service.CheckOutService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/checkouts")
@CrossOrigin(origins = "*")
public class CheckOutController {

    @Autowired
    private CheckOutService checkOutService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<CheckOut>>> getAll() {
        List<CheckOut> checkOuts = checkOutService.findAll();
        return ResponseEntity.ok(ApiResponse.success(checkOuts));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<CheckOut>> getById(@PathVariable Long id) {
        CheckOut checkOut = checkOutService.findById(id);
        return ResponseEntity.ok(ApiResponse.success(checkOut));
    }

    @GetMapping("/hoy")
    public ResponseEntity<ApiResponse<List<CheckOut>>> getHoy() {
        List<CheckOut> checkOuts = checkOutService.findCheckOutsDeHoy();
        return ResponseEntity.ok(ApiResponse.success(checkOuts));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<CheckOut>> create(@Valid @RequestBody CheckOut checkOut) {
        CheckOut created = checkOutService.create(checkOut);
        return ResponseEntity.ok(ApiResponse.success("Check-out realizado exitosamente", created));
    }
}
