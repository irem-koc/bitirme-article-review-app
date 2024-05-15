package dev.irem.reviewapp.business.abstracts;

import dev.irem.reviewapp.business.requests.CreateAuthenticationRequest;
import dev.irem.reviewapp.business.requests.CreateRegisterRequest;
import dev.irem.reviewapp.business.responses.GetAuthenticationResponse;
import dev.irem.reviewapp.business.responses.PostVerifySessionResponse;

public interface AuthenticationService {
    GetAuthenticationResponse register(CreateRegisterRequest createRegisterRequest);

    GetAuthenticationResponse authenticate(CreateAuthenticationRequest createAuthenticationRequest);

    PostVerifySessionResponse verifySession(String token);
}
