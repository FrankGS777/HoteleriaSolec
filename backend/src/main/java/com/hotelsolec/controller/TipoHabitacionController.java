package com.hotelsolec.controller;

import com.hotelsolec.dto.ApiResponse;
import com.hotelsolec.entity.TipoHabitacion;
import com.hotelsolec.service.TipoHabitacionService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tipos-habitacion")
@CrossOrigin(origins = "*")
public class TipoHabitacionController {

    @Autowired
    private TipoHabitacionService tipoHabitacionService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<TipoHabitacion>>> getAll() {
        List<TipoHabitacion> tipos = tipoHabitacionService.findAll();
        return ResponseEntity.ok(ApiResponse.success(tipos));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<TipoHabitacion>> getById(@PathVariable Long id) {
        TipoHabitacion tipo = tipoHabitacionService.findById(id);
        return ResponseEntity.ok(ApiResponse.success(tipo));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<TipoHabitacion>> create(@Valid @RequestBody TipoHabitacion tipoHabitacion) {
        TipoHabitacion created = tipoHabitacionService.create(tipoHabitacion);
        return ResponseEntity.ok(ApiResponse.success("Tipo de habitación creado exitosamente", created));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<TipoHabitacion>> update(@PathVariable Long id, @Valid @RequestBody TipoHabitacion tipoHabitacion) {
        TipoHabitacion updated = tipoHabitacionService.update(id, tipoHabitacion);
        return ResponseEntity.ok(ApiResponse.success("Tipo de habitación actualizado exitosamente", updated));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {
        tipoHabitacionService.delete(id);
        return ResponseEntity.ok(ApiResponse.success("Tipo de habitación eliminado exitosamente", null));
    }
}
