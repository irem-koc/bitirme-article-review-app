package dev.irem.reviewapp.business.datas;

import java.util.List;

import dev.irem.reviewapp.entities.concretes.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class GetAllTaskData {
    private int id;
    private String title;
    private String articleId;
    private List<String> scores;
    private String overallAssessment;
    private List<String> detailedComments;
    private String review;
    private User user;
}
