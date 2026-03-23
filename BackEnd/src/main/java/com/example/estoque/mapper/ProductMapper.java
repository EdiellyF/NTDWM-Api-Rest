package com.example.estoque.mapper;

import com.example.estoque.dto.ProductDTO;
import com.example.estoque.model.Product;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ProductMapper{
    ProductDTO toDTO(Product product);
    Product toEntity(ProductDTO productDTO);
}
