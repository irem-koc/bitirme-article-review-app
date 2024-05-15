package dev.irem.reviewapp.business.concretes;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import dev.irem.reviewapp.auth.config.abstracts.JwtService;
import dev.irem.reviewapp.business.abstracts.TaskService;
import dev.irem.reviewapp.business.datas.GetAllTaskData;
import dev.irem.reviewapp.business.requests.CreateTaskRequest;
import dev.irem.reviewapp.business.requests.DeleteTaskRequest;
import dev.irem.reviewapp.business.requests.UpdateTaskRequest;
import dev.irem.reviewapp.business.responses.DeleteTaskResponse;
import dev.irem.reviewapp.business.responses.GetAllTaskResponse;
import dev.irem.reviewapp.business.responses.PostTaskResponse;
import dev.irem.reviewapp.business.responses.UpdateTaskResponse;
import dev.irem.reviewapp.core.utilities.exceptions.TaskNotFoundException;
import dev.irem.reviewapp.core.utilities.exceptions.UserNotFoundException;
import dev.irem.reviewapp.core.utilities.mappers.ModelMapperService;
import dev.irem.reviewapp.dataAccess.abstracts.TaskRepository;
import dev.irem.reviewapp.dataAccess.abstracts.UserRepository;
import dev.irem.reviewapp.entities.concretes.Task;
import dev.irem.reviewapp.entities.concretes.User;
import dev.irem.reviewapp.helper.Helper;

@Service
public class TaskManager implements TaskService {
        private TaskRepository taskRepository;
        private UserRepository userRepository;

        @Autowired
        private JwtService jwtService;

        @Autowired
        private ModelMapperService modelMapperService;

        public TaskManager(TaskRepository taskRepository, UserRepository userRepository) {
                this.taskRepository = taskRepository;
                this.userRepository = userRepository;
        }

        @Override
        public DeleteTaskResponse delete(DeleteTaskRequest deleteTaskRequest) {
                Task task = this.taskRepository.findById(deleteTaskRequest.getTaskId())
                                .orElseThrow(() -> new TaskNotFoundException("there is not any task with this id"));
                this.taskRepository.delete(task);
                DeleteTaskResponse deleteTaskResponse = DeleteTaskResponse.builder()
                                .datetime(LocalDateTime.now())
                                .requestId(deleteTaskRequest.getRequestId())
                                .status("SUCCESS")
                                .build();

                return deleteTaskResponse;
        }

        @Transactional(readOnly = true)
        @Cacheable(value = "UserRepository::findByEmail", key = "#bearerToken")
        @Override
        public GetAllTaskResponse getAllTask(String bearerToken, String requestId) {
                String token = Helper.extractToken(bearerToken);
                int userId = this.jwtService.extractUserId(token);

                User user = this.userRepository.findById(userId)
                                .orElseThrow(() -> new UserNotFoundException("there is not any user with this id"));

                List<Task> tasks = this.taskRepository.findAllByUserIdOrderById(user.getId())
                                .orElseThrow(() -> new UserNotFoundException("there is not any task with this id"));

                List<GetAllTaskData> taskList = tasks.stream()
                                .map(task -> this.modelMapperService.forResponse()
                                                .map(task, GetAllTaskData.class))
                                .collect(Collectors.toList());

                GetAllTaskResponse getAllTaskResponse = GetAllTaskResponse.builder()
                                .taskList(taskList)
                                .datetime(LocalDateTime.now())
                                .status("SUCCESS")
                                .requestId(requestId)
                                .build();

                return getAllTaskResponse;
        }

        @Override
        public PostTaskResponse add(CreateTaskRequest createTaskRequest, String bearerToken) {
                String token = Helper.extractToken(bearerToken);
                int userId = this.jwtService.extractUserId(token);

                User user = this.userRepository.findById(userId)
                                .orElseThrow(() -> new UserNotFoundException("there is not any user with this id"));

                // store the requestId before mapping
                String requestId = createTaskRequest.getRequestId();

                // To ignore the requestId field for mapper process, we need to setRequestId as
                // null
                createTaskRequest.setRequestId(null);

                Task task = this.modelMapperService.forRequest().map(createTaskRequest, Task.class);
                task.setUser(user);
                this.taskRepository.save(task);

                PostTaskResponse postTaskResponse = PostTaskResponse.builder()
                                .requestId(requestId)
                                .title(createTaskRequest.getTitle())
                                .scores(createTaskRequest.getScores())
                                .review(createTaskRequest.getReview())
                                .datetime(LocalDateTime.now())
                                .status("SUCCESS")
                                .build();

                return postTaskResponse;
        }

        @Override
        public UpdateTaskResponse update(UpdateTaskRequest updateTaskRequest) {
                // Find the task by ID
                Task task = this.taskRepository.findById(updateTaskRequest.getTaskId())
                                .orElseThrow(() -> new TaskNotFoundException("there is not any task with this id"));

                // Check if title is provided for update
                if (updateTaskRequest.getTitle() != null) {
                        task.setTitle(updateTaskRequest.getTitle());
                }

                // Check if body is provided for update

                // Save the updated task to the repository
                this.taskRepository.save(task);

                UpdateTaskResponse updateTaskResponse = UpdateTaskResponse.builder()
                                .datetime(LocalDateTime.now())
                                .requestId(updateTaskRequest.getRequestId())
                                .status("SUCCESS")
                                .title(task.getTitle())
                                .build();

                return updateTaskResponse;
        }
}
