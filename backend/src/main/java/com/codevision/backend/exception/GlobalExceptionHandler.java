package com.codevision.backend.exception;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.Instant;
import java.util.NoSuchElementException;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(
            EmailAlreadyExistsException.class
    )
    public ResponseEntity<ApiError>
    handleEmailAlreadyExists(
            EmailAlreadyExistsException ex
    ) {

        return ResponseEntity
                .status(
                        HttpStatus.CONFLICT
                )
                .body(error(HttpStatus.CONFLICT, ex.getMessage()));
    }

    @ExceptionHandler(
            InvalidCredentialsException.class
    )
    public ResponseEntity<ApiError>
    handleInvalidCredentials(
            InvalidCredentialsException ex
    ) {

        return ResponseEntity
                .status(
                        HttpStatus.UNAUTHORIZED
                )
                .body(error(HttpStatus.UNAUTHORIZED, ex.getMessage()));
    }

    @ExceptionHandler(NoSuchElementException.class)
    public ResponseEntity<ApiError> handleNotFound(
            NoSuchElementException ex
    ) {
        String message = ex.getMessage() == null ? "Resource not found" : ex.getMessage();
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(error(HttpStatus.NOT_FOUND, message));
    }

    @ExceptionHandler({
            IllegalArgumentException.class,
            MethodArgumentNotValidException.class,
            HttpMessageNotReadableException.class
    })
    public ResponseEntity<ApiError> handleBadRequest(
            Exception ex
    ) {
        String message = ex.getMessage();

        if (ex instanceof MethodArgumentNotValidException validationException) {
            message = validationException.getBindingResult()
                    .getFieldErrors()
                    .stream()
                    .findFirst()
                    .map(fieldError -> fieldError.getField() + ": " + fieldError.getDefaultMessage())
                    .orElse("Request validation failed");
        }
        if (ex instanceof HttpMessageNotReadableException) {
            message = "Request body is missing or contains invalid JSON";
        }

        return ResponseEntity.badRequest()
                .body(error(HttpStatus.BAD_REQUEST, message));
    }

    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<ApiError> handleAccessDenied(
            AccessDeniedException ex
    ) {
        return ResponseEntity.status(HttpStatus.FORBIDDEN)
                .body(error(HttpStatus.FORBIDDEN, "You do not have permission to access this resource"));
    }

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<ApiError> handleConflict(
            DataIntegrityViolationException ex
    ) {
        return ResponseEntity.status(HttpStatus.CONFLICT)
                .body(error(HttpStatus.CONFLICT, "The request conflicts with existing data"));
    }

    @ExceptionHandler(IllegalStateException.class)
    public ResponseEntity<ApiError> handleUnavailable(
            IllegalStateException ex
    ) {
        return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE)
                .body(error(HttpStatus.SERVICE_UNAVAILABLE, ex.getMessage()));
    }

    private ApiError error(
            HttpStatus status,
            String message
    ) {
        return new ApiError(
                Instant.now(),
                status.value(),
                status.getReasonPhrase(),
                message
        );
    }
}
