package com.example.sgc_backend.config;

import com.example.sgc_backend.model.Usuario;
import com.example.sgc_backend.service.UsuarioService;
import com.example.sgc_backend.util.JwtUtil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.util.Collections;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private static final Logger logger = LoggerFactory.getLogger(JwtAuthenticationFilter.class);

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UsuarioService usuarioService;

    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request,
                                    @NonNull HttpServletResponse response,
                                    @NonNull FilterChain chain) throws ServletException, IOException {

        final String authHeader = request.getHeader("Authorization");

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            System.out.println("⛔ No se encontró el token o no empieza con 'Bearer '");
            chain.doFilter(request, response);
            return;
        }

        final String jwt = authHeader.substring(7);
        final String username;

        try {
            username = jwtUtil.extractUsername(jwt);
            System.out.println("✅ Usuario extraído del token: " + username);
        } catch (Exception e) {
            logger.error("❌ Error al extraer el usuario del token", e);
            chain.doFilter(request, response);
            return;
        }

        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            try {
                if (jwtUtil.validateToken(jwt, username)) {
                    Usuario usuario = usuarioService.findByEmail(username).orElse(null);
                    if (usuario != null) {
                        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                                usuario, null,
                                Collections.singletonList(() -> "ROLE_" + usuario.getRol())
                        );
                        authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                        SecurityContextHolder.getContext().setAuthentication(authToken);
                        System.out.println("✅ Usuario autenticado correctamente: " + username);
                    } else {
                        System.out.println("❌ Usuario no encontrado en base de datos: " + username);
                    }
                } else {
                    System.out.println("❌ Token inválido para usuario: " + username);
                }
            } catch (Exception e) {
                logger.error("❌ Error durante la validación del token", e);
            }
        }

        chain.doFilter(request, response);
    }
}
