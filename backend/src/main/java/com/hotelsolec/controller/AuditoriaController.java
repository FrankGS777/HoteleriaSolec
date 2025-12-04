package com.hotelsolec.controller;

import com.hotelsolec.dto.ApiResponse;
import com.hotelsolec.entity.Auditoria;
import com.hotelsolec.service.AuditoriaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/auditoria")
@CrossOrigin(origins = "*")
public class AuditoriaController {

    @Autowired
    private AuditoriaService auditoriaService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<Auditoria>>> getAll() {
        List<Auditoria> auditorias = auditoriaService.findAll();
        return ResponseEntity.ok(ApiResponse.success(auditorias));
    }

    @GetMapping("/usuario/{usuarioId}")
    public ResponseEntity<ApiResponse<List<Auditoria>>> getByUsuario(@PathVariable Long usuarioId) {
        List<Auditoria> auditorias = auditoriaService.findByUsuarioId(usuarioId);
        return ResponseEntity.ok(ApiResponse.success(auditorias));
    }
}
