package com.citylist.service;

import com.citylist.db.CityRepository;
import com.citylist.service.dto.CityDto;
import com.citylist.service.dto.CitySearchDto;
import com.citylist.service.mapper.CityUpdateMapper;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CityDomainServiceImpl implements CityDomainService {
    private final static String ID_HEADER = "id";
    private final static String NAME_HEADER = "name";
    private final static String PHOTO_HEADER = "photo";
    private final static String[] CITY_CSV_HEADERS = {ID_HEADER, NAME_HEADER, PHOTO_HEADER};

    private final CityRepository cityRepository;
    private final CityUpdateMapper cityUpdateMapper;

    @Override
    @NonNull
    public Page<CityDto> searchPage(@NonNull CitySearchDto searchDto, @NonNull Pageable pageable) {
        return cityRepository.searchPage(searchDto, pageable);
    }

    @Override
    @NonNull
    public CityDto update(@NonNull CityDto updateDto) {
        CityDto existingCity = cityRepository.findById(updateDto.getId());
        cityUpdateMapper.update(existingCity, updateDto);
        return cityRepository.save(existingCity);
    }

    @Override
    public CityDto get(Long id) {
        return cityRepository.findById(id);
    }

    @Override
    public void upload(@NonNull InputStream inputStream) {
        try (InputStreamReader reader = new InputStreamReader(inputStream);
             CSVParser parser = new CSVParser(reader, CSVFormat.DEFAULT
                 .withHeader(CITY_CSV_HEADERS)
                 .withSkipHeaderRecord()))
        {
            List<CSVRecord> records = parser.getRecords();
            cityRepository.saveAll(parseCsvCityRecord(records));
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @NonNull
    private List<CityDto> parseCsvCityRecord(@NonNull List<CSVRecord> records) {
        return records
            .stream()
            // TODO validation of CSV
            .map(csvRecord -> CityDto
                .builder()
                .id(Long.valueOf(csvRecord.get(ID_HEADER)))
                .name(csvRecord.get(NAME_HEADER))
                .photoUrl(csvRecord.get(PHOTO_HEADER))
                .build()
            )
            .collect(Collectors.toList());
    }
}
