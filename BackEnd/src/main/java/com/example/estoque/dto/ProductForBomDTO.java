package com.example.estoque.dto;

import java.util.List;

public record ProductForBomDTO(
        Long productId,
        String productName,
        List<BomDTO> billOfMaterials
) {}
