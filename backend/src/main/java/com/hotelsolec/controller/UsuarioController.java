package com.hotelsolec.controller;

import com.hotelsolec.dto.ApiResponse;
import com.hotelsolec.entity.Usuario;
import com.hotelsolec.service.UsuarioService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/usuarios")
@CrossOrigin(origins = "*")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

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
    public ResponseEntity<ApiResponse<Usuario>> create(@Valid @RequestBody Usuario usuario) {
        Usuario created = usuarioService.create(usuario);
        return ResponseEntity.ok(ApiResponse.success("Usuario creado exitosamente", created));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<Usuario>> update(@PathVariable Long id, @Valid @RequestBody Usuario usuario) {
        Usuario updated = usuarioService.update(id, usuario);
        return ResponseEntity.ok(ApiResponse.success("Usuario actualizado exitosamente", updated));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {
        usuarioService.delete(id);
        return ResponseEntity.ok(ApiResponse.success("Usuario eliminado exitosamente", null));
    }
}
