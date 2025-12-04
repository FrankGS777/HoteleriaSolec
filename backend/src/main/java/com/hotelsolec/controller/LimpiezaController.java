package com.hotelsolec.controller;

import com.hotelsolec.dto.ApiResponse;
import com.hotelsolec.entity.LimpiezaHabitacion;
import com.hotelsolec.service.LimpiezaService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/limpieza")
@CrossOrigin(origins = "*")
public class LimpiezaController {

    @Autowired
    private LimpiezaService limpiezaService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<LimpiezaHabitacion>>> getAll() {
        List<LimpiezaHabitacion> limpiezas = limpiezaService.findAll();
        return ResponseEntity.ok(ApiResponse.success(limpiezas));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<LimpiezaHabitacion>> getById(@PathVariable Long id) {
        LimpiezaHabitacion limpieza = limpiezaService.findById(id);
        return ResponseEntity.ok(ApiResponse.success(limpieza));
    }

    @GetMapping("/pendientes")
    public ResponseEntity<ApiResponse<List<LimpiezaHabitacion>>> getPendientes() {
        List<LimpiezaHabitacion> limpiezas = limpiezaService.findPendientes();
        return ResponseEntity.ok(ApiResponse.success(limpiezas));
    }

    @GetMapping("/empleado/{empleadoId}")
    public ResponseEntity<ApiResponse<List<LimpiezaHabitacion>>> getByEmpleado(@PathVariable Long empleadoId) {
        List<LimpiezaHabitacion> limpiezas = limpiezaService.findByEmpleadoId(empleadoId);
        return ResponseEntity.ok(ApiResponse.success(limpiezas));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<LimpiezaHabitacion>> create(@Valid @RequestBody LimpiezaHabitacion limpieza) {
        LimpiezaHabitacion created = limpiezaService.create(limpieza);
        return ResponseEntity.ok(ApiResponse.success("Limpieza programada exitosamente", created));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<LimpiezaHabitacion>> update(@PathVariable Long id, @Valid @RequestBody LimpiezaHabitacion limpieza) {
        LimpiezaHabitacion updated = limpiezaService.update(id, limpieza);
        return ResponseEntity.ok(ApiResponse.success("Limpieza actualizada exitosamente", updated));
    }

    @PutMapping("/{id}/iniciar")
    public ResponseEntity<ApiResponse<LimpiezaHabitacion>> iniciar(@PathVariable Long id) {
        LimpiezaHabitacion iniciada = limpiezaService.iniciar(id);
        return ResponseEntity.ok(ApiResponse.success("Limpieza iniciada exitosamente", iniciada));
    }

    @PutMapping("/{id}/completar")
    public ResponseEntity<ApiResponse<LimpiezaHabitacion>> completar(@PathVariable Long id) {
        LimpiezaHabitacion completada = limpiezaService.completar(id);
        return ResponseEntity.ok(ApiResponse.success("Limpieza completada exitosamente", completada));
    }
}
