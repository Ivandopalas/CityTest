package com.citylist.api;

import com.citylist.service.dto.CityDto;
import com.citylist.service.dto.CitySearchDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;

@RequestMapping("/city")
public interface CityApi {

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ALLOW_READ')")
    CityDto getById(@PathVariable("id") Long id);

    @PostMapping("/search")
    @PreAuthorize("hasRole('ALLOW_READ')")
    Page<CityDto> searchPage(@RequestBody @Valid CitySearchDto searchDto, Pageable pageable);

    @PutMapping
    @PreAuthorize("hasRole('ALLOW_EDIT')")
    CityDto update(@RequestBody @Valid CityDto cityDto);

    @PutMapping("/import")
    @PreAuthorize("hasRole('ALLOW_EDIT')")
    void handleCsvCityUpload(@RequestParam("file") MultipartFile file);
}
