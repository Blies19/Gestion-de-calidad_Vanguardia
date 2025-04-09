// src/main/java/com/example/sgc_backend/util/JwtUtil.java
package com.example.sgc_backend.util;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JwtUtil {
    private static final String SECRET_KEY = "tu_clave_secreta_aqui";
    private static final long EXPIRATION_TIME = 86400000; // 24 horas

    public String generateToken(String email, String rol) {
        return Jwts.builder()
            .setSubject(email)
            .claim("rol", rol)
            .setIssuedAt(new Date())
            .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
            .signWith(SignatureAlgorithm.HS512, SECRET_KEY)
            .compact();
    }

    public String extractEmail(String token) {
        return Jwts.parser()
            .setSigningKey(SECRET_KEY)
            .parseClaimsJws(token)
            .getBody()
            .getSubject();
    }
}