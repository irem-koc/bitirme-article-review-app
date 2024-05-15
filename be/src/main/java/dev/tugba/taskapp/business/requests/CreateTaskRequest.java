package dev.tugba.taskapp.business.requests;

import java.util.List;

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
public class CreateTaskRequest {
    @NotNull(message = "title : must not be null")
    @NotEmpty(message = "title : must not be empty")
    @NotBlank(message = "title : must not be blank")
    private String title;

    @NotNull(message = "review : must not be null")
    @NotEmpty(message = "review : must not be empty")
    @NotBlank(message = "review : must not be blank")
    private String review;

    @NotNull(message = "scores : must not be null")
    @NotEmpty(message = "scores : must not be empty")
    // @@NotBlankList(message = "scores : must not be blank")
    private List<String> scores;

    @NotNull(message = "overallAssessment : must not be null")
    @NotEmpty(message = "overallAssessment : must not be empty")
    @NotBlank(message = "overallAssessment : must not be blank")
    private String overallAssessment;

    @NotNull(message = "detailedComments : must not be null")
    @NotEmpty(message = "detailedComments : must not be empty")
    // @NotBlank(message = "detailedComments : must not be blank")
    private List<String> detailedComments;

    @NotBlank(message = "Request ID must not be blank")
    private String requestId;
}
