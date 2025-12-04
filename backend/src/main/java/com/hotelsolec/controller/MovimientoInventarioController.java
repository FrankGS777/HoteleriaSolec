package com.hotelsolec.controller;

import com.hotelsolec.dto.ApiResponse;
import com.hotelsolec.entity.MovimientoInventario;
import com.hotelsolec.service.MovimientoInventarioService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/movimientos-inventario")
@CrossOrigin(origins = "*")
public class MovimientoInventarioController {

    @Autowired
    private MovimientoInventarioService movimientoInventarioService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<MovimientoInventario>>> getAll() {
        List<MovimientoInventario> movimientos = movimientoInventarioService.findAll();
        return ResponseEntity.ok(ApiResponse.success(movimientos));
    }

    @GetMapping("/amenity/{amenityId}")
    public ResponseEntity<ApiResponse<List<MovimientoInventario>>> getByAmenity(@PathVariable Long amenityId) {
        List<MovimientoInventario> movimientos = movimientoInventarioService.findByAmenityId(amenityId);
        return ResponseEntity.ok(ApiResponse.success(movimientos));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<MovimientoInventario>> create(@Valid @RequestBody MovimientoInventario movimiento) {
        MovimientoInventario created = movimientoInventarioService.create(movimiento);
        return ResponseEntity.ok(ApiResponse.success("Movimiento registrado exitosamente", created));
    }
}
