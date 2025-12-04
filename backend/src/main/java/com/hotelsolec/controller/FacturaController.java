package com.hotelsolec.controller;

import com.hotelsolec.dto.ApiResponse;
import com.hotelsolec.entity.Factura;
import com.hotelsolec.service.FacturaService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/facturas")
@CrossOrigin(origins = "*")
public class FacturaController {

    @Autowired
    private FacturaService facturaService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<Factura>>> getAll() {
        List<Factura> facturas = facturaService.findAll();
        return ResponseEntity.ok(ApiResponse.success(facturas));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Factura>> getById(@PathVariable Long id) {
        Factura factura = facturaService.findById(id);
        return ResponseEntity.ok(ApiResponse.success(factura));
    }

    @GetMapping("/reserva/{reservaId}")
    public ResponseEntity<ApiResponse<List<Factura>>> getByReserva(@PathVariable Long reservaId) {
        List<Factura> facturas = facturaService.findByReservaId(reservaId);
        return ResponseEntity.ok(ApiResponse.success(facturas));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Factura>> create(@Valid @RequestBody Factura factura) {
        Factura created = facturaService.create(factura);
        return ResponseEntity.ok(ApiResponse.success("Factura creada exitosamente", created));
    }

    @PutMapping("/{id}/anular")
    public ResponseEntity<ApiResponse<Factura>> anular(@PathVariable Long id) {
        Factura anulada = facturaService.anular(id);
        return ResponseEntity.ok(ApiResponse.success("Factura anulada exitosamente", anulada));
    }
}
