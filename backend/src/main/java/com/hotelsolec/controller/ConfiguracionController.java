package com.hotelsolec.controller;

import com.hotelsolec.dto.ApiResponse;
import com.hotelsolec.entity.Configuracion;
import com.hotelsolec.service.ConfiguracionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/configuracion")
@CrossOrigin(origins = "*")
public class ConfiguracionController {

    @Autowired
    private ConfiguracionService configuracionService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<Configuracion>>> getAll() {
        List<Configuracion> configuraciones = configuracionService.findAll();
        return ResponseEntity.ok(ApiResponse.success(configuraciones));
    }

    @GetMapping("/{clave}")
    public ResponseEntity<ApiResponse<Configuracion>> getByClave(@PathVariable String clave) {
        Configuracion configuracion = configuracionService.findByClave(clave);
        return ResponseEntity.ok(ApiResponse.success(configuracion));
    }

    @PutMapping("/{clave}")
    public ResponseEntity<ApiResponse<Configuracion>> update(@PathVariable String clave, @RequestBody Map<String, String> request) {
        String valor = request.get("valor");
        Configuracion updated = configuracionService.update(clave, valor);
        return ResponseEntity.ok(ApiResponse.success("Configuración actualizada exitosamente", updated));
    }
}
