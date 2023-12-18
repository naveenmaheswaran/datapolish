package com.example.Data.PolishBackend.Controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.ResponseEntity;
import com.example.Data.PolishBackend.Service.FileUploadService; // Import the FileUploadService

import java.io.IOException;
import java.util.Date;


@RestController
@CrossOrigin(origins = {"http://16.170.150.247:9000", "http://localhost:4200"})
public class FileUploadController {
    @Autowired
    private FileUploadService fileUploadService;


    @PostMapping("/upload-csv")

    public ResponseEntity<String> uploadCSVFile(@RequestParam("file") MultipartFile file, @RequestHeader("Authorization") String token) throws IOException {

        return fileUploadService.uploadCSVFile(file);

    }




}


