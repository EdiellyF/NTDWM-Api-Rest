<script setup>
import { ref } from 'vue'
import { useMateriaisStore } from '@/stores/materiais'

const materiais = useMateriaisStore()

const formData = ref({
  name: '',
  amountStored: 0
})

const mensagem = ref(null)

const handleSubmit = async () => {
  const resultado = await materiais.criarMaterial({ ...formData.value })

  if (resultado.success) {
    mensagem.value = { tipo: 'sucesso', texto: 'Material adicionado com sucesso!' }
    formData.value = { name: '', amountStored: 0 }
  } else {
    mensagem.value = { tipo: 'erro', texto: resultado.mensagem || 'Erro ao salvar.' }
  }
}
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <div v-if="mensagem" :class="['feedback', mensagem.tipo]">
      {{ mensagem.texto }}
    </div>

    <div class="field">
      <label>Nome:</label>
      <input type="text" v-model="formData.name" placeholder="Digite o nome do material" required />
    </div>

    <div class="field">
      <label>Quantidade em Estoque:</label>
      <input type="number" v-model.number="formData.amountStored" min="0" />
    </div>

    <button type="submit">Salvar Material</button>
  </form>
</template>

<style scoped>
.feedback {
  padding: 10px;
  border-radius: 6px;
  margin-bottom: 16px;
  text-align: center;
  font-weight: 600;
  font-size: 0.9rem;
}
.feedback.sucesso {
  background-color: #dcfce7;
  color: #166534;
}
.feedback.erro {
  background-color: #fee2e2;
  color: #991b1b;
}

.field {
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
}

label {
  font-weight: bold;
  margin-bottom: 5px;
}

input {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #8b5cf6;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
}

button:hover {
  background-color: #6d28d9;
}
</style>
