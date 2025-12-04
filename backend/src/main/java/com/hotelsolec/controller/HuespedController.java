package com.hotelsolec.controller;

import com.hotelsolec.dto.ApiResponse;
import com.hotelsolec.entity.Huesped;
import com.hotelsolec.service.HuespedService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/huespedes")
@CrossOrigin(origins = "*")
public class HuespedController {

    @Autowired
    private HuespedService huespedService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<Huesped>>> getAll() {
        List<Huesped> huespedes = huespedService.findAll();
        return ResponseEntity.ok(ApiResponse.success(huespedes));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Huesped>> getById(@PathVariable Long id) {
        Huesped huesped = huespedService.findById(id);
        return ResponseEntity.ok(ApiResponse.success(huesped));
    }

    @GetMapping("/reserva/{reservaId}")
    public ResponseEntity<ApiResponse<List<Huesped>>> getByReserva(@PathVariable Long reservaId) {
        List<Huesped> huespedes = huespedService.findByReservaId(reservaId);
        return ResponseEntity.ok(ApiResponse.success(huespedes));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Huesped>> create(@Valid @RequestBody Huesped huesped) {
        Huesped created = huespedService.create(huesped);
        return ResponseEntity.ok(ApiResponse.success("Huésped creado exitosamente", created));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<Huesped>> update(@PathVariable Long id, @Valid @RequestBody Huesped huesped) {
        Huesped updated = huespedService.update(id, huesped);
        return ResponseEntity.ok(ApiResponse.success("Huésped actualizado exitosamente", updated));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {
        huespedService.delete(id);
        return ResponseEntity.ok(ApiResponse.success("Huésped eliminado exitosamente", null));
    }
}
