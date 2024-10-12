package si.um.feri.Backend.rest;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ControllerTest {
    @GetMapping("/info")
    public String info() {
        return "Hello from the backend!";
    }
}
