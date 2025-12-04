package com.hotelsolec.controller;

import com.hotelsolec.dto.ApiResponse;
import com.hotelsolec.entity.Habitacion;
import com.hotelsolec.service.HabitacionService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/habitaciones")
@CrossOrigin(origins = "*")
public class HabitacionController {

    @Autowired
    private HabitacionService habitacionService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<Habitacion>>> getAll() {
        List<Habitacion> habitaciones = habitacionService.findAll();
        return ResponseEntity.ok(ApiResponse.success(habitaciones));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Habitacion>> getById(@PathVariable Long id) {
        Habitacion habitacion = habitacionService.findById(id);
        return ResponseEntity.ok(ApiResponse.success(habitacion));
    }

    @GetMapping("/disponibles")
    public ResponseEntity<ApiResponse<List<Habitacion>>> getDisponibles() {
        List<Habitacion> habitaciones = habitacionService.findDisponibles();
        return ResponseEntity.ok(ApiResponse.success(habitaciones));
    }

    @GetMapping("/estado/{estado}")
    public ResponseEntity<ApiResponse<List<Habitacion>>> getByEstado(@PathVariable String estado) {
        List<Habitacion> habitaciones = habitacionService.findByEstado(estado);
        return ResponseEntity.ok(ApiResponse.success(habitaciones));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Habitacion>> create(@Valid @RequestBody Habitacion habitacion) {
        Habitacion created = habitacionService.create(habitacion);
        return ResponseEntity.ok(ApiResponse.success("Habitación creada exitosamente", created));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<Habitacion>> update(@PathVariable Long id, @Valid @RequestBody Habitacion habitacion) {
        Habitacion updated = habitacionService.update(id, habitacion);
        return ResponseEntity.ok(ApiResponse.success("Habitación actualizada exitosamente", updated));
    }

    @PutMapping("/{id}/estado")
    public ResponseEntity<ApiResponse<Habitacion>> cambiarEstado(@PathVariable Long id, @RequestBody Map<String, String> request) {
        String estado = request.get("estado");
        Habitacion updated = habitacionService.cambiarEstado(id, estado);
        return ResponseEntity.ok(ApiResponse.success("Estado actualizado exitosamente", updated));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {
        habitacionService.delete(id);
        return ResponseEntity.ok(ApiResponse.success("Habitación eliminada exitosamente", null));
    }
}
