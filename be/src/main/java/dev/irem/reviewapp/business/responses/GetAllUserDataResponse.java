package dev.irem.reviewapp.business.responses;

import java.io.Serializable;
import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class GetAllUserDataResponse implements Serializable {
    private String firstName;
    private String lastName;
    private String email;
    private String status;
    private Date datetime;
    private String requestId;
}