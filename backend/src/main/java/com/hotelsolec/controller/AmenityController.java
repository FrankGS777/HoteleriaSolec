package com.hotelsolec.controller;

import com.hotelsolec.dto.ApiResponse;
import com.hotelsolec.entity.Amenity;
import com.hotelsolec.service.AmenityService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/amenities")
@CrossOrigin(origins = "*")
public class AmenityController {

    @Autowired
    private AmenityService amenityService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<Amenity>>> getAll() {
        List<Amenity> amenities = amenityService.findAll();
        return ResponseEntity.ok(ApiResponse.success(amenities));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Amenity>> getById(@PathVariable Long id) {
        Amenity amenity = amenityService.findById(id);
        return ResponseEntity.ok(ApiResponse.success(amenity));
    }

    @GetMapping("/stock-bajo")
    public ResponseEntity<ApiResponse<List<Amenity>>> getStockBajo() {
        List<Amenity> amenities = amenityService.findStockBajo();
        return ResponseEntity.ok(ApiResponse.success(amenities));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Amenity>> create(@Valid @RequestBody Amenity amenity) {
        Amenity created = amenityService.create(amenity);
        return ResponseEntity.ok(ApiResponse.success("Amenity creado exitosamente", created));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<Amenity>> update(@PathVariable Long id, @Valid @RequestBody Amenity amenity) {
        Amenity updated = amenityService.update(id, amenity);
        return ResponseEntity.ok(ApiResponse.success("Amenity actualizado exitosamente", updated));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {
        amenityService.delete(id);
        return ResponseEntity.ok(ApiResponse.success("Amenity eliminado exitosamente", null));
    }
}
