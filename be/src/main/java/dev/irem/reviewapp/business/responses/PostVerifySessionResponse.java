package dev.irem.reviewapp.business.responses;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PostVerifySessionResponse {
    private String status;
    private LocalDateTime datetime;
    private String requestId;
}
