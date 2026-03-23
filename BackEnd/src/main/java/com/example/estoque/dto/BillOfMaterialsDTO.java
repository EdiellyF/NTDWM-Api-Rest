package com.example.estoque.dto;

public record BillOfMaterialsDTO(
        Long id,
        Long productId,
        String productName,
        String materialName,
        Integer materialNeeded) {
}
