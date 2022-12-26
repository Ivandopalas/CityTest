package com.citylist.db.postgresql.mapper;

import com.citylist.db.postgresql.entity.CityEntity;
import com.citylist.service.dto.CityDto;
import org.mapstruct.Mapper;

import static org.mapstruct.ReportingPolicy.ERROR;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ERROR)
public interface DbMapper {
    CityDto toCityDto(CityEntity city);

    CityEntity toCityEntity(CityDto city);
}
