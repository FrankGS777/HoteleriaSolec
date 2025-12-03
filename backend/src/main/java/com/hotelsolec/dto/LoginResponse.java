package com.hotelsolec.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoginResponse {
    private String token;
    private String type = "Bearer";
    private String username;
    private String nombreCompleto;
    private String role;
    private String email;
    
    public LoginResponse(String token, String username, String nombreCompleto, String role, String email) {
        this.token = token;
        this.username = username;
        this.nombreCompleto = nombreCompleto;
        this.role = role;
        this.email = email;
    }
}
