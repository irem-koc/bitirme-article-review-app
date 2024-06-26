package dev.irem.reviewapp.webApi.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dev.irem.reviewapp.business.abstracts.AuthenticationService;
import dev.irem.reviewapp.business.requests.CreateAuthenticationRequest;
import dev.irem.reviewapp.business.requests.CreateRegisterRequest;
import dev.irem.reviewapp.business.responses.GetAuthenticationResponse;
import dev.irem.reviewapp.business.responses.PostVerifySessionResponse;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

@Validated
@RestController
@RequestMapping("/api/v1/auth")
@AllArgsConstructor
public class AuthenticationController {
    private AuthenticationService authenticationService;

    @PostMapping("/register")
    @CrossOrigin(exposedHeaders = { "Access-Control-Allow-Origin", "Access-Control-Allow-Credentials" })
    public ResponseEntity<GetAuthenticationResponse> register(
            @RequestBody @Valid CreateRegisterRequest createRegisterRequest) {
        return ResponseEntity.ok(this.authenticationService.register(createRegisterRequest));
    }

    @PostMapping("/authenticate")
    @CrossOrigin(exposedHeaders = { "Access-Control-Allow-Origin", "Access-Control-Allow-Credentials" })
    public ResponseEntity<GetAuthenticationResponse> authenticate(
            @RequestBody @Valid CreateAuthenticationRequest createAuthenticationRequest) {
        return ResponseEntity.ok(this.authenticationService.authenticate(createAuthenticationRequest));
    }

    @PostMapping("/verifySession")
    @CrossOrigin(exposedHeaders = { "Access-Control-Allow-Origin", "Access-Control-Allow-Credentials" })
    public ResponseEntity<PostVerifySessionResponse> verifySession(@RequestHeader("Authorization") String bearerToken) {
        return ResponseEntity.ok(this.authenticationService.verifySession(bearerToken));
    }
}
