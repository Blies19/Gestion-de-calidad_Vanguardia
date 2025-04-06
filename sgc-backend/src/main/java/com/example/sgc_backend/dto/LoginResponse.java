package com.example.sgc_backend.dto;

import lombok.Data;

@Data
public class LoginResponse {
    private String token;
    private String rol;
}