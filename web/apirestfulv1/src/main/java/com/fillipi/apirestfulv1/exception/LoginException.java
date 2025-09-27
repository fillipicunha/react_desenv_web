package com.fillipi.apirestfulv1.exception;



public class LoginException extends RuntimeException {
    public LoginException(String message) {
        super(message);
    }
}