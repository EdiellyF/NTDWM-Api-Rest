import { defineStore } from 'pinia'
import api from '../services/api'
import { ref } from 'vue'

export const useEstoqueStore = defineStore('estoque', () => {
  const listaProdutos = ref([])
  const carregando = ref(false)
  const erro = ref(null)

  async function carregarDados() {
    carregando.value = true
    erro.value = null
    try {
      const resposta = await api.get('/products')
      listaProdutos.value = resposta.data
    } catch (error) {
      erro.value = error.response?.data?.message || 'Erro ao carregar produtos.'
      console.error('Erro ao carregar produtos:', error)
    } finally {
      carregando.value = false
    }
  }

  async function criarProduto(novoProduto) {
    try {
      const resposta = await api.post('/products/create', novoProduto)
      if (resposta.data) {
        listaProdutos.value.push(resposta.data)
      } else {
        await carregarDados()
      }
      return { success: true }
    } catch (error) {
      const mensagem = error.response?.data?.message || 'Erro ao criar produto.'
      console.error('Erro ao criar produto:', error)
      return { success: false, mensagem }
    }
  }

  return { listaProdutos, carregando, erro, carregarDados, criarProduto }
})