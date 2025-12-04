package com.hotelsolec.controller;

import com.hotelsolec.dto.ApiResponse;
import com.hotelsolec.entity.Pago;
import com.hotelsolec.service.PagoService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/pagos")
@CrossOrigin(origins = "*")
public class PagoController {

    @Autowired
    private PagoService pagoService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<Pago>>> getAll() {
        List<Pago> pagos = pagoService.findAll();
        return ResponseEntity.ok(ApiResponse.success(pagos));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Pago>> getById(@PathVariable Long id) {
        Pago pago = pagoService.findById(id);
        return ResponseEntity.ok(ApiResponse.success(pago));
    }

    @GetMapping("/factura/{facturaId}")
    public ResponseEntity<ApiResponse<List<Pago>>> getByFactura(@PathVariable Long facturaId) {
        List<Pago> pagos = pagoService.findByFacturaId(facturaId);
        return ResponseEntity.ok(ApiResponse.success(pagos));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Pago>> create(@Valid @RequestBody Pago pago) {
        Pago created = pagoService.create(pago);
        return ResponseEntity.ok(ApiResponse.success("Pago registrado exitosamente", created));
    }
}
