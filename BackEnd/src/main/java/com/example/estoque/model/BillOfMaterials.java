package com.example.estoque.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class BillOfMaterials {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotNull
    private Integer materialNeeded;
    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;
    @ManyToOne
    @JoinColumn(name = "material_id")
    private Material material;

    public void setMaterialNeeded(int materialNeeded){
        if(materialNeeded<0){
            throw new IllegalArgumentException("Quantidade informada inválida!");
        }
        this.materialNeeded = materialNeeded;
    }
}
