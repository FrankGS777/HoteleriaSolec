package com.hotelsolec.service;

import com.hotelsolec.entity.Configuracion;
import com.hotelsolec.exception.ResourceNotFoundException;
import com.hotelsolec.repository.ConfiguracionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class ConfiguracionService {

    @Autowired
    private ConfiguracionRepository configuracionRepository;

    public List<Configuracion> findAll() {
        return configuracionRepository.findAll();
    }

    public Configuracion findByClave(String clave) {
        return configuracionRepository.findByClave(clave)
                .orElseThrow(() -> new ResourceNotFoundException("Configuración no encontrada con clave: " + clave));
    }

    public Configuracion update(String clave, String valor) {
        Configuracion configuracion = findByClave(clave);
        configuracion.setValor(valor);
        return configuracionRepository.save(configuracion);
    }
}
