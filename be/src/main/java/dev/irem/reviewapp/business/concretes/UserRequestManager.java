package dev.irem.reviewapp.business.concretes;

import java.time.LocalDateTime;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import dev.irem.reviewapp.auth.config.abstracts.JwtService;
import dev.irem.reviewapp.business.abstracts.UserRequestService;
import dev.irem.reviewapp.business.requests.UpdateUserEmailAddressRequest;
import dev.irem.reviewapp.business.responses.GetAllUserDataResponse;
import dev.irem.reviewapp.business.responses.UpdateUserEmailAddressResponse;
import dev.irem.reviewapp.core.utilities.exceptions.UserNotFoundException;
import dev.irem.reviewapp.core.utilities.mappers.ModelMapperService;
import dev.irem.reviewapp.dataAccess.abstracts.UserRepository;
import dev.irem.reviewapp.entities.concretes.User;
import dev.irem.reviewapp.helper.Helper;

@Service
public class UserRequestManager implements UserRequestService {
        private UserRepository userRepository;

        @Autowired
        private JwtService jwtService;

        @Autowired
        private ModelMapperService modelMapperService;

        public UserRequestManager(UserRepository userRepository) {
                this.userRepository = userRepository;
        }

        @Transactional(readOnly = true)
        @Cacheable(value = "JwtService::extractUsername", key = "#bearerToken")
        @Override
        public GetAllUserDataResponse getAllUserData(String bearerToken, String requestId) {
                String token = Helper.extractToken(bearerToken);
                String email = this.jwtService.extractUsername(token);

                User user = this.userRepository.findByEmail(email)
                                .orElseThrow(() -> new UserNotFoundException("no user found with this email"));
                GetAllUserDataResponse getAllUserDataResponse = this.modelMapperService.forResponse().map(user,
                                GetAllUserDataResponse.class);

                getAllUserDataResponse.setDatetime(new Date());
                getAllUserDataResponse.setStatus("SUCCESS");
                getAllUserDataResponse.setRequestId(requestId);

                return getAllUserDataResponse;
        }

        @Override
        public UpdateUserEmailAddressResponse updateUserEmailAddress(String bearerToken,
                        UpdateUserEmailAddressRequest updateUserEmailAddressRequest) {
                String token = Helper.extractToken(bearerToken);
                String email = this.jwtService.extractUsername(token);

                User user = this.userRepository.findByEmail(email)
                                .orElseThrow(() -> new UserNotFoundException("no user found with this email"));
                user.setEmail(updateUserEmailAddressRequest.getEmail());
                this.userRepository.save(user);

                String jwtToken = this.jwtService.generateToken(user);

                UpdateUserEmailAddressResponse updateUserEmailAddressResponse = UpdateUserEmailAddressResponse.builder()
                                .email(updateUserEmailAddressRequest.getEmail())
                                .status("SUCCESS")
                                .datetime(LocalDateTime.now())
                                .requestId(updateUserEmailAddressRequest.getRequestId())
                                .token(jwtToken)
                                .build();

                return updateUserEmailAddressResponse;
        }
}