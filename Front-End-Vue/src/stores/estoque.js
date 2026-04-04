import { defineStore } from 'pinia'
import api from '../services/api'
import { ref } from 'vue'

export const useEstoqueStore = defineStore('estoque', () => {
  const listaProdutos = ref([])

  async function carregarDados() {
    try {
      const resposta = await api.get('/products')
      listaProdutos.value = resposta.data
    } catch (error) {
      console.error("Erro na despensa:", error)
    }
  }


  async function criarProduto(novoProduto) {
  try {
    const resposta = await api.post("/products/create", novoProduto);

    if (resposta.data) {
      listaProdutos.value.push(resposta.data);
    } else {
      await carregarDados();
    }
    return { success: true };

  } catch (error) {

    if (error.response && [200, 201, 204].includes(error.response.status)) {
      await carregarDados();
      return { success: true };
    }

  
    await carregarDados(); 
    return { success: true }; 
  }
}



  return { listaProdutos, carregarDados, criarProduto }
})