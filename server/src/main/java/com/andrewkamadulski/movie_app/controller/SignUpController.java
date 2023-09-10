package com.andrewkamadulski.movie_app.controller;

import com.andrewkamadulski.movie_app.requestmodels.SignUpRequest;
import org.springframework.web.bind.annotation.*;

import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.util.Properties;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api/signup")
public class SignUpController {

    public SignUpController signUpController;

    String password = System.getenv("email_pass");




    @PostMapping("/send")
    public void sendSignUp(@RequestBody SignUpRequest signUpRequest)  {

        // Recipient's email ID needs to be mentioned.
        String to = "Andrew.kamadulski@gmail.com";

        // Sender's email ID needs to be mentioned
        String from = "kamadulski999@gmail.com";

        // Assuming you are sending email from through gmails smtp
        String host = "smtp.gmail.com";

        // Get system properties
        Properties properties = System.getProperties();

        // Setup mail server
        properties.put("mail.smtp.host", host);
        properties.put("mail.smtp.port", "465");
        properties.put("mail.smtp.ssl.enable", "true");
        properties.put("mail.smtp.auth", "true");

        // Get the Session object.// and pass username and password
        Session session = Session.getInstance(properties, new javax.mail.Authenticator() {

            protected PasswordAuthentication getPasswordAuthentication() {

                return new PasswordAuthentication("kamadulski999@gmail.com", password);

            }
        });
        // Used to debug SMTP issues
        // session.setDebug(true);

        try {
            // Create a default MimeMessage object.
            MimeMessage message = new MimeMessage(session);

            // Set From: header field of the header.
            message.setFrom(new InternetAddress(from));

            // Set To: header field of the header.
            message.addRecipient(Message.RecipientType.TO, new InternetAddress(to));

            // Set Subject: header field
            message.setSubject("New SignUp Request from HorrorScorer.com");

            // Now set the actual message
          String firstName = signUpRequest.getFirstName();
          String lastName = signUpRequest.getLastName();
          String userName = signUpRequest.getUserName();
          String email = signUpRequest.getEmail();

          String messageText = String.format(" First Name: %s  \n Last Name: %s \n User Name: %s \n Email: %s ", firstName, lastName, userName, email);

            message.setText(messageText);

            System.out.println("sending...");
            // Send message
            Transport.send(message);
            System.out.println("Sent message successfully....");
        } catch (MessagingException mex) {
            mex.printStackTrace();
        }




    };
}
