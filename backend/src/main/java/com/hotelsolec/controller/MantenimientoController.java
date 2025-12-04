package com.hotelsolec.controller;

import com.hotelsolec.dto.ApiResponse;
import com.hotelsolec.entity.Mantenimiento;
import com.hotelsolec.service.MantenimientoService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/mantenimiento")
@CrossOrigin(origins = "*")
public class MantenimientoController {

    @Autowired
    private MantenimientoService mantenimientoService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<Mantenimiento>>> getAll() {
        List<Mantenimiento> mantenimientos = mantenimientoService.findAll();
        return ResponseEntity.ok(ApiResponse.success(mantenimientos));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Mantenimiento>> getById(@PathVariable Long id) {
        Mantenimiento mantenimiento = mantenimientoService.findById(id);
        return ResponseEntity.ok(ApiResponse.success(mantenimiento));
    }

    @GetMapping("/pendientes")
    public ResponseEntity<ApiResponse<List<Mantenimiento>>> getPendientes() {
        List<Mantenimiento> mantenimientos = mantenimientoService.findPendientes();
        return ResponseEntity.ok(ApiResponse.success(mantenimientos));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Mantenimiento>> create(@Valid @RequestBody Mantenimiento mantenimiento) {
        Mantenimiento created = mantenimientoService.create(mantenimiento);
        return ResponseEntity.ok(ApiResponse.success("Mantenimiento creado exitosamente", created));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<Mantenimiento>> update(@PathVariable Long id, @Valid @RequestBody Mantenimiento mantenimiento) {
        Mantenimiento updated = mantenimientoService.update(id, mantenimiento);
        return ResponseEntity.ok(ApiResponse.success("Mantenimiento actualizado exitosamente", updated));
    }

    @PutMapping("/{id}/iniciar")
    public ResponseEntity<ApiResponse<Mantenimiento>> iniciar(@PathVariable Long id) {
        Mantenimiento iniciado = mantenimientoService.iniciar(id);
        return ResponseEntity.ok(ApiResponse.success("Mantenimiento iniciado exitosamente", iniciado));
    }

    @PutMapping("/{id}/completar")
    public ResponseEntity<ApiResponse<Mantenimiento>> completar(@PathVariable Long id) {
        Mantenimiento completado = mantenimientoService.completar(id);
        return ResponseEntity.ok(ApiResponse.success("Mantenimiento completado exitosamente", completado));
    }
}
