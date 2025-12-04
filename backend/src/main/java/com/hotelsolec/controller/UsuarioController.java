package com.hotelsolec.controller;

import com.hotelsolec.dto.ApiResponse;
import com.hotelsolec.entity.Usuario;
import com.hotelsolec.service.UsuarioService;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/usuarios")
@CrossOrigin(origins = "*")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private ObjectMapper objectMapper;

    @GetMapping
    public ResponseEntity<ApiResponse<List<Usuario>>> getAll() {
        List<Usuario> usuarios = usuarioService.findAll();
        return ResponseEntity.ok(ApiResponse.success(usuarios));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Usuario>> getById(@PathVariable Long id) {
        Usuario usuario = usuarioService.findById(id);
        return ResponseEntity.ok(ApiResponse.success(usuario));
    }

    @GetMapping("/rol/{rolId}")
    public ResponseEntity<ApiResponse<List<Usuario>>> getByRol(@PathVariable Long rolId) {
        List<Usuario> usuarios = usuarioService.findByRoleId(rolId);
        return ResponseEntity.ok(ApiResponse.success(usuarios));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Usuario>> create(@RequestBody Map<String, Object> payload) {
        try {
            // Extract roleId if present
            Long roleId = payload.containsKey("roleId") ? 
                    ((Number) payload.get("roleId")).longValue() : null;
            
            // Convert payload to Usuario (excluding roleId)
            payload.remove("roleId");
            Usuario usuario = objectMapper.convertValue(payload, Usuario.class);
            
            // Use appropriate service method
            Usuario created = roleId != null ? 
                    usuarioService.createWithRoleId(usuario, roleId) : 
                    usuarioService.create(usuario);
            
            return ResponseEntity.ok(ApiResponse.success("Usuario creado exitosamente", created));
        } catch (Exception e) {
            throw new RuntimeException("Error al procesar la solicitud: " + e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<Usuario>> update(@PathVariable Long id, @RequestBody Map<String, Object> payload) {
        try {
            // Extract roleId if present
            Long roleId = payload.containsKey("roleId") ? 
                    ((Number) payload.get("roleId")).longValue() : null;
            
            // Convert payload to Usuario (excluding roleId)
            payload.remove("roleId");
            Usuario usuario = objectMapper.convertValue(payload, Usuario.class);
            
            // Use appropriate service method
            Usuario updated = roleId != null ? 
                    usuarioService.updateWithRoleId(id, usuario, roleId) : 
                    usuarioService.update(id, usuario);
            
            return ResponseEntity.ok(ApiResponse.success("Usuario actualizado exitosamente", updated));
        } catch (Exception e) {
            throw new RuntimeException("Error al procesar la solicitud: " + e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {
        usuarioService.delete(id);
        return ResponseEntity.ok(ApiResponse.success("Usuario eliminado exitosamente", null));
    }
}
