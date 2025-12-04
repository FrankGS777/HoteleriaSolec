package com.hotelsolec.controller;

import com.hotelsolec.dto.ApiResponse;
import com.hotelsolec.entity.Servicio;
import com.hotelsolec.service.ServicioService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/servicios")
@CrossOrigin(origins = "*")
public class ServicioController {

    @Autowired
    private ServicioService servicioService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<Servicio>>> getAll() {
        List<Servicio> servicios = servicioService.findAll();
        return ResponseEntity.ok(ApiResponse.success(servicios));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Servicio>> getById(@PathVariable Long id) {
        Servicio servicio = servicioService.findById(id);
        return ResponseEntity.ok(ApiResponse.success(servicio));
    }

    @GetMapping("/categoria/{categoria}")
    public ResponseEntity<ApiResponse<List<Servicio>>> getByCategoria(@PathVariable String categoria) {
        List<Servicio> servicios = servicioService.findByCategoria(categoria);
        return ResponseEntity.ok(ApiResponse.success(servicios));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Servicio>> create(@Valid @RequestBody Servicio servicio) {
        Servicio created = servicioService.create(servicio);
        return ResponseEntity.ok(ApiResponse.success("Servicio creado exitosamente", created));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<Servicio>> update(@PathVariable Long id, @Valid @RequestBody Servicio servicio) {
        Servicio updated = servicioService.update(id, servicio);
        return ResponseEntity.ok(ApiResponse.success("Servicio actualizado exitosamente", updated));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {
        servicioService.delete(id);
        return ResponseEntity.ok(ApiResponse.success("Servicio eliminado exitosamente", null));
    }
}
