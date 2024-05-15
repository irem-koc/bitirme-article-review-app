package dev.irem.reviewapp.core.utilities.exceptions;

public class AlreadyExistsUserException extends RuntimeException {
    public AlreadyExistsUserException(String message) {
        super(message);
    }
}
