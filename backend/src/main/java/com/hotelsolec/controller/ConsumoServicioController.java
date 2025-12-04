package com.hotelsolec.controller;

import com.hotelsolec.dto.ApiResponse;
import com.hotelsolec.entity.ConsumoServicio;
import com.hotelsolec.service.ConsumoServicioService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/consumos")
@CrossOrigin(origins = "*")
public class ConsumoServicioController {

    @Autowired
    private ConsumoServicioService consumoServicioService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<ConsumoServicio>>> getAll() {
        List<ConsumoServicio> consumos = consumoServicioService.findAll();
        return ResponseEntity.ok(ApiResponse.success(consumos));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<ConsumoServicio>> getById(@PathVariable Long id) {
        ConsumoServicio consumo = consumoServicioService.findById(id);
        return ResponseEntity.ok(ApiResponse.success(consumo));
    }

    @GetMapping("/reserva/{reservaId}")
    public ResponseEntity<ApiResponse<List<ConsumoServicio>>> getByReserva(@PathVariable Long reservaId) {
        List<ConsumoServicio> consumos = consumoServicioService.findByReservaId(reservaId);
        return ResponseEntity.ok(ApiResponse.success(consumos));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<ConsumoServicio>> create(@Valid @RequestBody ConsumoServicio consumo) {
        ConsumoServicio created = consumoServicioService.create(consumo);
        return ResponseEntity.ok(ApiResponse.success("Consumo registrado exitosamente", created));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {
        consumoServicioService.delete(id);
        return ResponseEntity.ok(ApiResponse.success("Consumo eliminado exitosamente", null));
    }
}
