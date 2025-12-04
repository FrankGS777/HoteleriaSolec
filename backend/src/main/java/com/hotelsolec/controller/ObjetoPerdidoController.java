package com.hotelsolec.controller;

import com.hotelsolec.dto.ApiResponse;
import com.hotelsolec.entity.ObjetoPerdido;
import com.hotelsolec.service.ObjetoPerdidoService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/objetos-perdidos")
@CrossOrigin(origins = "*")
public class ObjetoPerdidoController {

    @Autowired
    private ObjetoPerdidoService objetoPerdidoService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<ObjetoPerdido>>> getAll() {
        List<ObjetoPerdido> objetos = objetoPerdidoService.findAll();
        return ResponseEntity.ok(ApiResponse.success(objetos));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<ObjetoPerdido>> getById(@PathVariable Long id) {
        ObjetoPerdido objeto = objetoPerdidoService.findById(id);
        return ResponseEntity.ok(ApiResponse.success(objeto));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<ObjetoPerdido>> create(@Valid @RequestBody ObjetoPerdido objetoPerdido) {
        ObjetoPerdido created = objetoPerdidoService.create(objetoPerdido);
        return ResponseEntity.ok(ApiResponse.success("Objeto perdido registrado exitosamente", created));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<ObjetoPerdido>> update(@PathVariable Long id, @Valid @RequestBody ObjetoPerdido objetoPerdido) {
        ObjetoPerdido updated = objetoPerdidoService.update(id, objetoPerdido);
        return ResponseEntity.ok(ApiResponse.success("Objeto perdido actualizado exitosamente", updated));
    }

    @PutMapping("/{id}/reclamar")
    public ResponseEntity<ApiResponse<ObjetoPerdido>> reclamar(@PathVariable Long id, @RequestBody Map<String, Long> request) {
        Long clienteId = request.get("clienteId");
        ObjetoPerdido reclamado = objetoPerdidoService.reclamar(id, clienteId);
        return ResponseEntity.ok(ApiResponse.success("Objeto reclamado exitosamente", reclamado));
    }
}
