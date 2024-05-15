package dev.irem.reviewapp.core.utilities.exceptions;

public class AccountCodeNotFoundException extends RuntimeException {
    public AccountCodeNotFoundException(String message) {
        super(message);
    }
}
