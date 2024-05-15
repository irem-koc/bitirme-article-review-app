package dev.irem.reviewapp.auth.config.abstracts;

import org.springframework.security.core.userdetails.UserDetails;

import dev.irem.reviewapp.entities.concretes.User;

public interface JwtService {
    public String generateToken(User user);

    public String extractUsername(String token);

    public boolean isTokenValid(String token, UserDetails userDetails);

    public int extractUserId(String token);

    public boolean isTokenExpired(String token);
}
