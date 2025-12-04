package com.hotelsolec.controller;

import com.hotelsolec.dto.ApiResponse;
import com.hotelsolec.entity.Reserva;
import com.hotelsolec.service.ReservaService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/reservas")
@CrossOrigin(origins = "*")
public class ReservaController {

    @Autowired
    private ReservaService reservaService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<Reserva>>> getAll() {
        List<Reserva> reservas = reservaService.findAll();
        return ResponseEntity.ok(ApiResponse.success(reservas));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Reserva>> getById(@PathVariable Long id) {
        Reserva reserva = reservaService.findById(id);
        return ResponseEntity.ok(ApiResponse.success(reserva));
    }

    @GetMapping("/estado/{estado}")
    public ResponseEntity<ApiResponse<List<Reserva>>> getByEstado(@PathVariable String estado) {
        List<Reserva> reservas = reservaService.findByEstado(estado);
        return ResponseEntity.ok(ApiResponse.success(reservas));
    }

    @GetMapping("/cliente/{clienteId}")
    public ResponseEntity<ApiResponse<List<Reserva>>> getByCliente(@PathVariable Long clienteId) {
        List<Reserva> reservas = reservaService.findByClienteId(clienteId);
        return ResponseEntity.ok(ApiResponse.success(reservas));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Reserva>> create(@Valid @RequestBody Reserva reserva) {
        Reserva created = reservaService.create(reserva);
        return ResponseEntity.ok(ApiResponse.success("Reserva creada exitosamente", created));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<Reserva>> update(@PathVariable Long id, @Valid @RequestBody Reserva reserva) {
        Reserva updated = reservaService.update(id, reserva);
        return ResponseEntity.ok(ApiResponse.success("Reserva actualizada exitosamente", updated));
    }

    @PutMapping("/{id}/cancelar")
    public ResponseEntity<ApiResponse<Reserva>> cancelar(@PathVariable Long id, @RequestBody Map<String, String> request) {
        String motivo = request.getOrDefault("motivo", "");
        Reserva cancelada = reservaService.cancelar(id, motivo);
        return ResponseEntity.ok(ApiResponse.success("Reserva cancelada exitosamente", cancelada));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {
        reservaService.delete(id);
        return ResponseEntity.ok(ApiResponse.success("Reserva eliminada exitosamente", null));
    }
}
