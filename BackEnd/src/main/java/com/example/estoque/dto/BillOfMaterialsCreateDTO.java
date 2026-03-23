package com.example.estoque.dto;

import jakarta.validation.Valid;

public record BillOfMaterialsCreateDTO(@Valid Long productId,@Valid Long materialId,@Valid Integer materialNeeded) {
}
