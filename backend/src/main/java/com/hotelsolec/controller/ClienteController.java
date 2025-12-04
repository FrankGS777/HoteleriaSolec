package com.hotelsolec.controller;

import com.hotelsolec.dto.ApiResponse;
import com.hotelsolec.entity.Cliente;
import com.hotelsolec.service.ClienteService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/clientes")
@CrossOrigin(origins = "*")
public class ClienteController {

    @Autowired
    private ClienteService clienteService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<Cliente>>> getAll() {
        List<Cliente> clientes = clienteService.findAll();
        return ResponseEntity.ok(ApiResponse.success(clientes));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Cliente>> getById(@PathVariable Long id) {
        Cliente cliente = clienteService.findById(id);
        return ResponseEntity.ok(ApiResponse.success(cliente));
    }

    @GetMapping("/buscar")
    public ResponseEntity<ApiResponse<List<Cliente>>> search(@RequestParam String q) {
        List<Cliente> clientes = clienteService.searchClientes(q);
        return ResponseEntity.ok(ApiResponse.success(clientes));
    }

    @GetMapping("/vip")
    public ResponseEntity<ApiResponse<List<Cliente>>> getVip() {
        List<Cliente> clientes = clienteService.findVip();
        return ResponseEntity.ok(ApiResponse.success(clientes));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Cliente>> create(@Valid @RequestBody Cliente cliente) {
        Cliente created = clienteService.create(cliente);
        return ResponseEntity.ok(ApiResponse.success("Cliente creado exitosamente", created));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<Cliente>> update(@PathVariable Long id, @Valid @RequestBody Cliente cliente) {
        Cliente updated = clienteService.update(id, cliente);
        return ResponseEntity.ok(ApiResponse.success("Cliente actualizado exitosamente", updated));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {
        clienteService.delete(id);
        return ResponseEntity.ok(ApiResponse.success("Cliente eliminado exitosamente", null));
    }
}
