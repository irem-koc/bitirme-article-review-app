package dev.irem.reviewapp.business.concretes;

import java.time.LocalDateTime;

import org.springframework.cache.annotation.Cacheable;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import dev.irem.reviewapp.auth.config.abstracts.JwtService;
import dev.irem.reviewapp.auth.config.constants.Role;
import dev.irem.reviewapp.business.abstracts.AuthenticationService;
import dev.irem.reviewapp.business.requests.CreateAuthenticationRequest;
import dev.irem.reviewapp.business.requests.CreateRegisterRequest;
import dev.irem.reviewapp.business.responses.GetAuthenticationResponse;
import dev.irem.reviewapp.business.responses.PostVerifySessionResponse;
import dev.irem.reviewapp.core.utilities.exceptions.AccountCodeNotFoundException;
import dev.irem.reviewapp.core.utilities.exceptions.AlreadyExistsUserException;
import dev.irem.reviewapp.core.utilities.exceptions.AuthenticationServiceException;
import dev.irem.reviewapp.core.utilities.exceptions.UserNotFoundException;
import dev.irem.reviewapp.dataAccess.abstracts.UserRepository;
import dev.irem.reviewapp.entities.concretes.User;
import dev.irem.reviewapp.helper.Helper;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthenticateManager implements AuthenticationService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    @Override
    @Transactional(readOnly = false)
    public GetAuthenticationResponse register(CreateRegisterRequest createRegisterRequest) {
        if (this.userRepository.existsByEmail(createRegisterRequest.getEmail())) {
            throw new AlreadyExistsUserException("email: it is already saved.");
        }

        User user = User.builder()
                .firstName(createRegisterRequest.getFirstName())
                .lastName(createRegisterRequest.getLastName())
                .email(createRegisterRequest.getEmail())
                .password(this.passwordEncoder.encode(createRegisterRequest.getPassword()))
                .rol(createRegisterRequest.getRol())
                .role(createRegisterRequest.getRole().toString() == "ADMIN" ? Role.ADMIN : Role.VISITOR)
                .build();

        // add user to userRepository
        this.userRepository.save(user);

        // create new token for the user
        String jwtToken = this.jwtService.generateToken(user);

        // return token in response
        return GetAuthenticationResponse.builder()
                .token(jwtToken).build();
    }

    @Override
    @Transactional(readOnly = true)
    @Cacheable(value = "AuthenticationService::findByEmail", key = "#createAuthenticationRequest.email")
    public GetAuthenticationResponse authenticate(CreateAuthenticationRequest createAuthenticationRequest) {
        User user;

        // check accountcode exists
        if (createAuthenticationRequest.getAccountcode() != null) {
            if (Helper.isValidEmail(createAuthenticationRequest.getAccountcode())) {
                user = this.userRepository.findByEmail(createAuthenticationRequest.getAccountcode())
                        .orElseThrow(() -> new UserNotFoundException("there is not any user with this email"));
            } else {
                user = this.userRepository.findByEmail(createAuthenticationRequest.getAccountcode())
                        .orElseThrow(() -> new UserNotFoundException("there is not any user with this turkishId"));
            }
        } else {
            throw new AccountCodeNotFoundException("Account code cannot be null");
        }

        try {
            // Try to authenticate the user
            this.authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            createAuthenticationRequest.getAccountcode(), createAuthenticationRequest.getPassword()));
        } catch (AuthenticationException e) {
            throw new AuthenticationServiceException("Accountcode and password are not matching.");
        }

        String jwtToken = this.jwtService.generateToken(user);
        return GetAuthenticationResponse.builder()
                .token(jwtToken).build();
    }

    @Override
    public PostVerifySessionResponse verifySession(String token) {
        String jwt = token.substring(7);
        boolean isTokenExpired = jwtService.isTokenExpired(jwt);
        return PostVerifySessionResponse
                .builder()
                .datetime(LocalDateTime.now())
                .status(!isTokenExpired ? "SUCCESS" : "FAILED")
                .requestId(token)
                .build();
    }
}
