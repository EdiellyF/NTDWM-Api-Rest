package com.example.estoque.dto;

public record ProductAvailableDTO (String name,
                                   Double value,
                                   Integer stored,
                                   Long maxProd) {
}
