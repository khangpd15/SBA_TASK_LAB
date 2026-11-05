package vn.edu.fpt;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import vn.edu.fpt.dtos.LoginRequest;

import static org.hamcrest.Matchers.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class FUNewsApiTests {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void testLogin_Success() throws Exception {
        LoginRequest req = new LoginRequest("SteveParis@FUNewsManagement.org", "@1");

        mockMvc.perform(post("/api/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.accountEmail", is("SteveParis@FUNewsManagement.org")))
                .andExpect(jsonPath("$.accountRole", is(1)));
    }

    @Test
    void testLogin_WrongPassword() throws Exception {
        LoginRequest req = new LoginRequest("SteveParis@FUNewsManagement.org", "wrongpass");

        mockMvc.perform(post("/api/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isUnauthorized());
    }

    @Test
    void testGetAllCategories() throws Exception {
        mockMvc.perform(get("/api/categories"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(greaterThanOrEqualTo(1))));
    }

    @Test
    void testCategoryDeleteRestriction() throws Exception {
        // Category 1 is used by NewsArticle 3, 4, 5
        mockMvc.perform(delete("/api/categories/1"))
                .andExpect(status().isBadRequest())
                .andExpect(status().reason(containsString("Cannot delete category")));
    }

    @Test
    void testAccountDeleteRestriction() throws Exception {
        // Account 1 has created NewsArticle 1 & 2
        mockMvc.perform(delete("/api/accounts/1"))
                .andExpect(status().isBadRequest())
                .andExpect(status().reason(containsString("Cannot delete account")));
    }

    @Test
    void testGetActiveNews() throws Exception {
        mockMvc.perform(get("/api/news/active"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(greaterThanOrEqualTo(1))));
    }

    @Test
    void testSearchNews() throws Exception {
        mockMvc.perform(get("/api/news/search").param("keyword", "Alumni"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(greaterThanOrEqualTo(1))));
    }
}
