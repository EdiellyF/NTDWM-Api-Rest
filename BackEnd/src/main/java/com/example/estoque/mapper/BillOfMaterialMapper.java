package com.example.estoque.mapper;

import com.example.estoque.dto.BillOfMaterialsCreateDTO;
import com.example.estoque.dto.BillOfMaterialsDTO;
import com.example.estoque.model.BillOfMaterials;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface BillOfMaterialMapper{
    @Mapping(target = "productId", source = "product.id")
    @Mapping(target = "materialId", source = "material.id")
    BillOfMaterialsCreateDTO toCreateDTO(BillOfMaterials bom);
    @Mapping(target = "product.id", source = "bom.productId")
    @Mapping(target = "material.id", source = "bom.materialId")
    BillOfMaterials toEntity(BillOfMaterialsCreateDTO bom);
    @Mapping(target = "productName", source = "bom.product.name")
    @Mapping(target = "productId", source = "bom.product.id")
    @Mapping(target = "materialName", source = "bom.material.name")
    BillOfMaterialsDTO toDTO(BillOfMaterials bom);
    BillOfMaterials toEntity(BillOfMaterialsDTO bom);
}
