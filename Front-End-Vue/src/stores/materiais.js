import { defineStore } from 'pinia'
import api from '../services/api'
import { ref } from 'vue'

export const useMateriaisStore = defineStore('materiais', () => {
  const listaMateriais = ref([])
  const carregando = ref(false)
  const erro = ref(null)

  async function carregarDados() {
    carregando.value = true
    erro.value = null
    try {
      const resposta = await api.get('/materials')
      listaMateriais.value = resposta.data
    } catch (error) {
      erro.value = error.response?.data?.message || 'Erro ao carregar materiais.'
      console.error('Erro ao carregar materiais:', error)
    } finally {
      carregando.value = false
    }
  }

  async function criarMaterial(novoMaterial) {
    try {
      const resposta = await api.post('/materials/create', novoMaterial)
      if (resposta.data) {
        listaMateriais.value.push(resposta.data)
      } else {
        await carregarDados()
      }
      return { success: true }
    } catch (error) {
      const mensagem = error.response?.data?.message || 'Erro ao criar material.'
      console.error('Erro ao criar material:', error)
      return { success: false, mensagem }
    }
  }

  async function deletarMaterial(id) {
    try {
      await api.delete(`/materials/${id}/delete`)
      listaMateriais.value = listaMateriais.value.filter(m => m.id !== id)
      return { success: true }
    } catch (error) {
      const mensagem = error.response?.data?.message || 'Erro ao deletar material.'
      console.error('Erro ao deletar material:', error)
      return { success: false, mensagem }
    }
  }

  async function atualizarMaterial(id, material) {
    try {
      const resposta = await api.patch(`/materials/${id}/update`, material)
      const index = listaMateriais.value.findIndex(m => m.id === id)
      if (index !== -1) {
        listaMateriais.value[index] = resposta.data
      }
      return { success: true }
    } catch (error) {
      const mensagem = error.response?.data?.message || 'Erro ao atualizar material.'
      console.error('Erro ao atualizar material:', error)
      return { success: false, mensagem }
    }
  }

  return { listaMateriais, carregando, erro, carregarDados, criarMaterial, deletarMaterial, atualizarMaterial }
})
