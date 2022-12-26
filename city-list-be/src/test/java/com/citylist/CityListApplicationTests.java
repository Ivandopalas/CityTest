package com.citylist;

import com.citylist.service.dto.CityDto;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

import java.net.URL;

import static org.springframework.http.HttpMethod.GET;

@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
class CityListApplicationTests extends E2ETestBase {
    private HttpHeaders loggedInHeader;

    @Test
    void testUploadAndGet() {
        loginAsAdmin();
        uploadCitiesFromTestFile();
        CityDto loadedCity = getCity(999);
        Assertions.assertEquals(CityDto
            .builder()
            .name("Yazd")
            .id(999L)
            .photoUrl(
                "https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Iran_-_Yazd_-_Amir_Chakmaq_Complex.jpg/500px-Iran_-_Yazd_-_Amir_Chakmaq_Complex.jpg")
            .build(), loadedCity);
    }

    @Test
    void testUpdateWithAdmin() {
        loginAsAdmin();
        uploadCitiesFromTestFile();
        CityDto newCityDto = CityDto.builder()
            .name("Test")
            .id(999L)
            .photoUrl(
                "https://test.org/test.jpg")
            .build();
        updateCity(newCityDto);
        Assertions.assertEquals(newCityDto, getCity(999));
    }

    @Test
    void testUpdateWithUser() {
        loginAsAdmin();
        uploadCitiesFromTestFile();
        loginAsUser();
        CityDto newCityDto = CityDto.builder()
            .name("Test")
            .id(999L)
            .photoUrl(
                "https://test.org/test.jpg")
            .build();

        HttpEntity<CityDto> requestEntity = new HttpEntity<>(newCityDto, loggedInHeader);
        ResponseEntity<String> response =
            testRestTemplate.exchange("/city", HttpMethod.PUT, requestEntity, String.class);
        Assertions.assertEquals(403, response.getStatusCode().value());
    }

    private void updateCity(CityDto newCity) {
        HttpEntity<CityDto> requestEntity = new HttpEntity<>(newCity, loggedInHeader);
        testRestTemplate.put("/city", requestEntity, String.class);
    }

    private CityDto getCity(long id) {
        ResponseEntity<CityDto> getCityResponse = testRestTemplate.exchange("/city/" + id,
            GET,
            new HttpEntity<String>(loggedInHeader),
            CityDto.class);
        return getCityResponse.getBody();
    }

    private void uploadCitiesFromTestFile() {
        URL fileUrl = this.getClass().getResource("/test_data/cities.csv");
        assert fileUrl != null;
        FileSystemResource file = new FileSystemResource(fileUrl.getPath());
        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
        body.add("file", file);
        HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, loggedInHeader);
        testRestTemplate.put("/city/import", requestEntity, String.class);
    }

    private void loginAsAdmin() {
        login("admin", "password");
    }

    private void loginAsUser() {
        login("user", "password");
    }

    private void login(String userName, String password) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        MultiValueMap<String, String> map = new LinkedMultiValueMap<>();
        map.add("username", userName);
        map.add("password", password);

        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(map, headers);

        ResponseEntity<String> response = testRestTemplate.postForEntity("/login", request, String.class);

        String jSessionIdCookie = response.getHeaders().getFirst("Set-Cookie");
        loggedInHeader = new HttpHeaders();
        loggedInHeader.add("Cookie", jSessionIdCookie);
    }
}
