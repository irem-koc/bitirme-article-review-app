package dev.irem.reviewapp.business.responses;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;

import dev.irem.reviewapp.business.datas.GetAllTaskData;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class GetAllTaskResponse implements Serializable {
    private List<GetAllTaskData> taskList;
    private String status;
    private LocalDateTime datetime;
    private String requestId;
}