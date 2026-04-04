<script setup>
import { onMounted } from 'vue'
import { useEstoqueStore } from '../stores/estoque'
import ProductCard from "../components/ProductCard.vue"

const estoque = useEstoqueStore() 
onMounted(() => {
  estoque.carregarDados() 
})
</script>

<template>
  <main class="main-content">
    <div class="summary-bar">
      <h2>Painel de Produtos</h2>
      <span class="count">{{ estoque.listaProdutos.length }} itens</span>
    </div>

    <div v-if="estoque.listaProdutos.length > 0" class="product-grid">
      <ProductCard 
        v-for="item in estoque.listaProdutos" 
        :key="item.id" 
        :nomeProduto="item.name" 
        :quantidade="item.amountStored" 
      />
    </div>
  </main>
</template>