package com.example.estoque.mapper;

import com.example.estoque.dto.MaterialDTO;
import com.example.estoque.model.Material;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface MaterialMapper {
    MaterialDTO toDTO(Material material);
    Material toEntity(MaterialDTO materialDTO);
}
