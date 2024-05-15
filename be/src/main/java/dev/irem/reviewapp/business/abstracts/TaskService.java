package dev.irem.reviewapp.business.abstracts;

import dev.irem.reviewapp.business.requests.CreateTaskRequest;
import dev.irem.reviewapp.business.requests.DeleteTaskRequest;
import dev.irem.reviewapp.business.requests.UpdateTaskRequest;
import dev.irem.reviewapp.business.responses.DeleteTaskResponse;
import dev.irem.reviewapp.business.responses.GetAllTaskResponse;
import dev.irem.reviewapp.business.responses.PostTaskResponse;
import dev.irem.reviewapp.business.responses.UpdateTaskResponse;

public interface TaskService {
    GetAllTaskResponse getAllTask(String bearerToken, String requestId);

    PostTaskResponse add(CreateTaskRequest createTaskRequest, String bearerToken);

    DeleteTaskResponse delete(DeleteTaskRequest deleteTaskRequest);

    UpdateTaskResponse update(UpdateTaskRequest updateTaskRequest);
}
