package dev.irem.reviewapp.webApi.controllers;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import dev.irem.reviewapp.business.abstracts.TaskService;
import dev.irem.reviewapp.business.requests.CreateTaskRequest;
import dev.irem.reviewapp.business.requests.DeleteTaskRequest;
import dev.irem.reviewapp.business.requests.UpdateTaskRequest;
import dev.irem.reviewapp.business.responses.DeleteTaskResponse;
import dev.irem.reviewapp.business.responses.GetAllTaskResponse;
import dev.irem.reviewapp.business.responses.PostTaskResponse;
import dev.irem.reviewapp.business.responses.UpdateTaskResponse;
import dev.irem.reviewapp.entities.concretes.Task;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/v1/task")
@PreAuthorize("hasRole('VISITOR')")
@AllArgsConstructor
public class TasksController {
    private TaskService taskService;
    private static final Logger logger = LoggerFactory.getLogger(TasksController.class);

    @PostMapping
    @PreAuthorize("hasAuthority('visitor:create')")
    @CrossOrigin(exposedHeaders = { "Access-Control-Allow-Origin", "Access-Control-Allow-Credentials" })
    public ResponseEntity<PostTaskResponse> add(@RequestBody @Valid CreateTaskRequest createTaskRequest,
            @RequestHeader("Authorization") String bearerToken) {
        logger.info("Received CreateTaskRequest: {}", createTaskRequest);
        return ResponseEntity.ok(this.taskService.add(createTaskRequest, bearerToken));
    }

    @DeleteMapping
    @PreAuthorize("hasAuthority('visitor:delete')")
    @CrossOrigin(exposedHeaders = { "Access-Control-Allow-Origin", "Access-Control-Allow-Credentials" })
    public ResponseEntity<DeleteTaskResponse> delete(@RequestHeader("Authorization") String bearerToken,
            @RequestBody @Valid DeleteTaskRequest deleteTaskRequest) {
        return ResponseEntity.ok(this.taskService.delete(deleteTaskRequest));
    }

    @PatchMapping
    @PreAuthorize("hasAuthority('visitor:update')")
    @CrossOrigin(exposedHeaders = { "Access-Control-Allow-Origin", "Access-Control-Allow-Credentials" })
    public ResponseEntity<UpdateTaskResponse> update(@RequestBody @Valid UpdateTaskRequest updateTaskRequest) {
        return ResponseEntity.ok(this.taskService.update(updateTaskRequest));
    }

    @GetMapping
    @PreAuthorize("hasAuthority('visitor:read')")
    @CrossOrigin(exposedHeaders = { "Access-Control-Allow-Origin", "Access-Control-Allow-Credentials" })
    public ResponseEntity<GetAllTaskResponse> getAllTask(@RequestHeader("Authorization") String bearerToken,
            @RequestParam String requestId) {
        return ResponseEntity.ok(this.taskService.getAllTask(bearerToken, requestId));
    }

    @GetMapping("/tasks")
    // @PreAuthorize("hasAuthority('visitor:read')")
    @CrossOrigin(exposedHeaders = { "Access-Control-Allow-Origin", "Access-Control-Allow-Credentials" })
    public ResponseEntity<List<Task>> getAllTasks() {
        List<Task> tasks = taskService.getAllTasks();
        return new ResponseEntity<>(tasks, HttpStatus.OK);
    }
}
