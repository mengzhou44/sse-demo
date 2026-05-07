package com.example.ssedemo;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

@RestController
@CrossOrigin(origins = "http://localhost:3000") // frontend port
public class SseController {

    // A thread pool to send events without blocking the request thread
    private final ExecutorService executor = Executors.newCachedThreadPool();

    @GetMapping(value = "/stream", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public SseEmitter stream() {
        SseEmitter emitter = new SseEmitter(0L); 

        executor.execute(() -> {
            try {
                for (int i = 1; i <= 50; i++) {
                    emitter.send(
                        SseEmitter.event()
                            .id(String.valueOf(i))
                            .name("message")
                            .data("Hello World #" + i)
                    );
                    Thread.sleep(100); // 100ms between each event so you can see them arrive
                }
                emitter.send(SseEmitter.event().name("done").data(""));
                emitter.complete();
            } catch (IOException | InterruptedException e) {
                emitter.completeWithError(e);
            }
        });

        return emitter;
    }
}
