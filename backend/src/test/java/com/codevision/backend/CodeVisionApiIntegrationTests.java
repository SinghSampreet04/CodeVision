package com.codevision.backend;

import com.codevision.backend.entity.User;
import com.codevision.backend.repository.ContestRepository;
import com.codevision.backend.repository.DiscussionRepository;
import com.codevision.backend.repository.ProblemRepository;
import com.codevision.backend.repository.SubmissionRepository;
import com.codevision.backend.repository.TestCaseRepository;
import com.codevision.backend.repository.UserRepository;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class CodeVisionApiIntegrationTests {

    @Autowired
    private MockMvc mockMvc;

    private final ObjectMapper objectMapper = new ObjectMapper();

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private DiscussionRepository discussionRepository;

    @Autowired
    private SubmissionRepository submissionRepository;

    @Autowired
    private TestCaseRepository testCaseRepository;

    @Autowired
    private ContestRepository contestRepository;

    @Autowired
    private ProblemRepository problemRepository;

    @Autowired
    private UserRepository userRepository;

    @BeforeEach
    void cleanDatabase() {
        discussionRepository.deleteAll();
        submissionRepository.deleteAll();
        testCaseRepository.deleteAll();
        contestRepository.deleteAll();
        problemRepository.deleteAll();
        userRepository.deleteAll();
    }

    @Test
    void supportsRegistrationLoginAndProfileAccess() throws Exception {
        mockMvc.perform(post("/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                  "username": "portfolio-user",
                                  "email": "user@example.com",
                                  "password": "secure-password"
                                }
                                """))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.username").value("portfolio-user"))
                .andExpect(jsonPath("$.role").value("USER"));

        String token = login("user@example.com", "secure-password");

        mockMvc.perform(get("/users/profile")
                        .header("Authorization", "Bearer " + token))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.username").value("portfolio-user"))
                .andExpect(jsonPath("$.totalSubmissions").value(0));
    }

    @Test
    void validatesRegistrationRequests() throws Exception {
        mockMvc.perform(post("/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                  "username": "x",
                                  "email": "not-an-email",
                                  "password": "short"
                                }
                                """))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.status").value(400))
                .andExpect(jsonPath("$.message").isNotEmpty());
    }

    @Test
    void preventsStandardUsersFromChangingAdminData() throws Exception {
        mockMvc.perform(post("/auth/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                        {
                          "username": "standard-user",
                          "email": "standard@example.com",
                          "password": "secure-password"
                        }
                        """));

        String token = login("standard@example.com", "secure-password");

        mockMvc.perform(post("/problems")
                        .header("Authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(problemJson()))
                .andExpect(status().isForbidden());

        mockMvc.perform(get("/testcases/problem/1")
                        .header("Authorization", "Bearer " + token))
                .andExpect(status().isForbidden());
    }

    @Test
    void returnsStructuredErrorsForUnauthorizedAndMalformedRequests() throws Exception {
        mockMvc.perform(get("/users/profile"))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.status").value(401))
                .andExpect(jsonPath("$.message").isNotEmpty());

        mockMvc.perform(post("/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{invalid"))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.status").value(400))
                .andExpect(jsonPath("$.message")
                        .value("Request body is missing or contains invalid JSON"));
    }

    @Test
    void allowsAdminsToManageHiddenTestCases() throws Exception {
        User admin = new User();
        admin.setUsername("admin");
        admin.setEmail("admin@example.com");
        admin.setPassword(passwordEncoder.encode("secure-password"));
        admin.setRole("ADMIN");
        userRepository.save(admin);

        String token = login("admin@example.com", "secure-password");
        String problemResponse = mockMvc.perform(post("/problems")
                        .header("Authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(problemJson()))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.title").value("Two Sum"))
                .andReturn()
                .getResponse()
                .getContentAsString();

        long problemId = objectMapper.readTree(problemResponse).get("id").asLong();

        mockMvc.perform(post("/testcases")
                        .header("Authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                  "problem": {"id": %d},
                                  "input": "2 7 11 15\\n9",
                                  "expectedOutput": "0 1",
                                  "hidden": true
                                }
                                """.formatted(problemId)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.hidden").value(true));

        mockMvc.perform(get("/testcases/problem/{problemId}", problemId))
                .andExpect(status().isUnauthorized());

        mockMvc.perform(get("/testcases/problem/{problemId}", problemId)
                        .header("Authorization", "Bearer " + token))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].hidden").value(true));
    }

    private String login(
            String email,
            String password
    ) throws Exception {
        String response = mockMvc.perform(post("/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                  "email": "%s",
                                  "password": "%s"
                                }
                                """.formatted(email, password)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.token").isNotEmpty())
                .andReturn()
                .getResponse()
                .getContentAsString();

        JsonNode loginResponse = objectMapper.readTree(response);
        return loginResponse.get("token").asText();
    }

    private String problemJson() {
        return """
                {
                  "title": "Two Sum",
                  "description": "Return the indexes of two values that add to the target.",
                  "difficulty": "Easy",
                  "sampleInput": "2 7 11 15\\n9",
                  "sampleOutput": "0 1"
                }
                """;
    }
}
