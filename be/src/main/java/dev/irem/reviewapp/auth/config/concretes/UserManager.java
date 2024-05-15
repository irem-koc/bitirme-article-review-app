package dev.irem.reviewapp.auth.config.concretes;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import dev.irem.reviewapp.auth.config.abstracts.UserService;
import dev.irem.reviewapp.core.utilities.exceptions.UserNotFoundException;
import dev.irem.reviewapp.dataAccess.abstracts.UserRepository;
import dev.irem.reviewapp.helper.Helper;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserManager implements UserService {
    private final UserRepository userRepository;

    @Override
    public UserDetailsService userDetailsService() {
        return new UserDetailsService() {

            @Override
            public UserDetails loadUserByUsername(String username) {
                if (Helper.isValidEmail(username)) {
                    return userRepository.findByEmail(username)
                            .orElseThrow(() -> new UserNotFoundException("No user found with this email"));
                } else {
                    throw new UsernameNotFoundException("Username is not a valid email: " + username);
                }
            }

        };
    }
}
