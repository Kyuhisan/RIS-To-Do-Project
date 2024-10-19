package si.um.feri.Backend.controller;

import jakarta.websocket.server.PathParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import si.um.feri.Backend.model.Task;
import si.um.feri.Backend.repository.TaskRepository;
import java.util.Optional;
import java.util.logging.Logger;

@RestController
public class TaskController {
    Logger logger = Logger.getLogger(TaskController.class.getName());

    @Autowired
    TaskRepository taskRepository;

    @GetMapping("/info")
    public String info() {
        return "Hello from the backend!";
    }

    @GetMapping("/tasks")
    public Iterable<Task> getAllTasks() {
        logger.info("Getting all tasks");
        return taskRepository.findAll();
    }

    @GetMapping("/tasks/{id}")
    public Optional<Task> getTaskById(@PathParam("id") int id) {
        logger.info("Getting task by id:" + id);
        return taskRepository.findById(id);
    }

    @PutMapping("tasks")
    public void putTask(Task task) {
        logger.info("Updating task:" + task.getId());
        taskRepository.save(task);
    }

    @PostMapping("/tasks")
    public Task newTask(Task task) {
        logger.info("Creating new task");
        Task newTask = new Task(task.getTaskName(), task.getTaskDescription(), task.getTaskGroup(), task.isStatus());
        taskRepository.save(newTask);
        return newTask;
    }
}
