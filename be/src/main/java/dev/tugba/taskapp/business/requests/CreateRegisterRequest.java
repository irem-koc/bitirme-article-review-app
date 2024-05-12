package dev.tugba.taskapp.business.requests;

import dev.tugba.taskapp.auth.config.constants.Role;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CreateRegisterRequest {

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
