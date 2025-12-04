package com.hotelsolec.controller;

import com.hotelsolec.dto.ApiResponse;
import com.hotelsolec.entity.Notificacion;
import com.hotelsolec.service.NotificacionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/notificaciones")
@CrossOrigin(origins = "*")
public class NotificacionController {

    @Autowired
    private NotificacionService notificacionService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<Notificacion>>> getNotificaciones(@RequestParam Long usuarioId) {
        List<Notificacion> notificaciones = notificacionService.findByUsuarioId(usuarioId);
        return ResponseEntity.ok(ApiResponse.success(notificaciones));
    }

    @PutMapping("/{id}/leer")
    public ResponseEntity<ApiResponse<Notificacion>> marcarLeida(@PathVariable Long id) {
        Notificacion notificacion = notificacionService.marcarLeida(id);
        return ResponseEntity.ok(ApiResponse.success("Notificación marcada como leída", notificacion));
    }

    @PutMapping("/leer-todas")
    public ResponseEntity<ApiResponse<Void>> marcarTodasLeidas(@RequestParam Long usuarioId) {
        notificacionService.marcarTodasLeidas(usuarioId);
        return ResponseEntity.ok(ApiResponse.success("Todas las notificaciones marcadas como leídas", null));
    }
}
