package dev.tugba.taskapp.business.requests;

import dev.tugba.taskapp.auth.config.constants.Role;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CreateRegisterRequest {
    @NotNull(message = "firstname : must not be null")
    @NotEmpty(message = "firstname : must not be empty")
    @NotBlank(message = "firstname : must not be blank")
    private String firstName;

    @NotNull(message = "lastname : must not be null")
    @NotEmpty(message = "lastname : must not be empty")
    @NotBlank(message = "lastname : must not be blank")
    private String lastName;
    @NotNull(message = "email : must not be null")
    @NotEmpty(message = "email : must not be empty")
    @NotBlank(message = "email : must not be blank")
    @Email(message = "email : must be correct email format")
    private String email;

    @NotNull(message = "password : must not be null")
    @NotEmpty(message = "password : must not be empty")
    @NotBlank(message = "password : must not be blank")
    private String password;

    private Role role;
}
