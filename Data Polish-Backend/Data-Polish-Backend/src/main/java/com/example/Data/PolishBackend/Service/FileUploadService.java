package com.example.Data.PolishBackend.Service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import com.azure.messaging.servicebus.*;
import com.azure.core.util.BinaryData;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import com.azure.messaging.servicebus.ServiceBusClientBuilder;
import com.azure.messaging.servicebus.ServiceBusMessage;
import com.azure.messaging.servicebus.ServiceBusSenderClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;
import com.azure.storage.blob.BlobServiceClient;
import com.azure.storage.blob.BlobContainerClient;
import com.azure.storage.blob.BlobClient;
import com.azure.storage.blob.BlobServiceClientBuilder;
import java.io.IOException;

/*  take file as param
    Upload the file to Azure Blob Storage - csv
    call stored procedure to filename in DB and get jobid
    publish json msg with filename and jobid to q1
 */
@Service
public class FileUploadService {
    //storing the blob connection string in a 'string' variable
    @Value("${azure.storage.connection-string}")
    private String azureConnectionString;

    //storing service connection string and queueName
    @Value("${azure.servicebus.connection-string}")
    private String serviceBusConnectionString;
    @Value("${azure.servicebus.queue-name-q1}")
    private String queueName;

    @Autowired
    private JdbcTemplate jdbcTemplate; // use JdbcTemplate for database queries

    public ResponseEntity<String> uploadCSVFile(@RequestParam("file") MultipartFile file)throws IOException {
        // Check if no file is selected to upload
        if (file.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Please select a CSV file to upload.");
        }

        // Check if the uploaded file is empty (0 KB in size)
        if (file.getSize() == 0) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("File cannot be blank!");
        }





        try {


            String fileName = "file";
            String sql = "CALL getjobid(?)";
            String jobID = jdbcTemplate.queryForObject(sql,String.class,fileName);

            // Create a JSON message
            String jsonMessage = "{\"filename\":\"" + fileName + "\", \"jobID\":\"" + jobID + "\"}";

            // Connect to Azure Service Bus


            return ResponseEntity.status(HttpStatus.CREATED).body(jsonMessage);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An error occurred during the file upload: " + e.getMessage());
        }
    }
}
