package dev.irem.reviewapp.core.utilities.exceptions;

import org.springframework.security.core.AuthenticationException;

public class AuthenticationServiceException extends AuthenticationException {
    public AuthenticationServiceException(String message) {
        super(message);
    }
}