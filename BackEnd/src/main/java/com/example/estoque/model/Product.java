package com.example.estoque.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;

@Entity(name = "products")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotNull
    @Column(unique = true)
    private String name;
    @NotNull
    @Positive
    private Double value;
    @PositiveOrZero
    private int amountStored;
    @OneToMany( mappedBy = "product", cascade = CascadeType.ALL)
    private Set<BillOfMaterials> billOfMaterials;

    public void setAmountStored(Integer amountStored){
        if (amountStored<0){
            throw new IllegalArgumentException("Quantidade informada inválida!");
        }
        this.amountStored = amountStored;
    }
}
