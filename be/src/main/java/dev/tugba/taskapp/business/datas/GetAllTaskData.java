package dev.tugba.taskapp.business.datas;

import java.util.List;

import dev.tugba.taskapp.entities.concretes.User;
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
    private List<String> scores;
    private String title;
    private String review;
    private User user;
}
