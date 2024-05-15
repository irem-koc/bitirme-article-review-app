package dev.tugba.taskapp.business.responses;

import java.time.LocalDateTime;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PostTaskResponse {
    private String title;
    private List<String> scores;
    private String review;
    private String overallAssessment;
    private List<String> detailedComments;
    private String status;
    private LocalDateTime datetime;
    private String requestId;
}
