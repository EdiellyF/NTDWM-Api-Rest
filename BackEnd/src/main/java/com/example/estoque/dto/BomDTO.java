package com.example.estoque.dto;

public record BomDTO(
        Long id,
        String materialName,
        Integer materialNeeded,
        Long materialId
) {
}
