package com.hotelsolec.controller;

import com.hotelsolec.dto.ApiResponse;
import com.hotelsolec.entity.Empleado;
import com.hotelsolec.service.EmpleadoService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/empleados")
@CrossOrigin(origins = "*")
public class EmpleadoController {

    @Autowired
    private EmpleadoService empleadoService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<Empleado>>> getAll() {
        List<Empleado> empleados = empleadoService.findAll();
        return ResponseEntity.ok(ApiResponse.success(empleados));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Empleado>> getById(@PathVariable Long id) {
        Empleado empleado = empleadoService.findById(id);
        return ResponseEntity.ok(ApiResponse.success(empleado));
    }

    @GetMapping("/activos")
    public ResponseEntity<ApiResponse<List<Empleado>>> getActivos() {
        List<Empleado> empleados = empleadoService.findActivos();
        return ResponseEntity.ok(ApiResponse.success(empleados));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Empleado>> create(@Valid @RequestBody Empleado empleado) {
        Empleado created = empleadoService.create(empleado);
        return ResponseEntity.ok(ApiResponse.success("Empleado creado exitosamente", created));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<Empleado>> update(@PathVariable Long id, @Valid @RequestBody Empleado empleado) {
        Empleado updated = empleadoService.update(id, empleado);
        return ResponseEntity.ok(ApiResponse.success("Empleado actualizado exitosamente", updated));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {
        empleadoService.delete(id);
        return ResponseEntity.ok(ApiResponse.success("Empleado eliminado exitosamente", null));
    }
}
