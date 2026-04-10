<script setup>
import { onMounted, ref } from 'vue'
import { useMateriaisStore } from '@/stores/materiais'
import MaterialCard from '@/components/MaterialCard.vue'

const materiais = useMateriaisStore()

const editando = ref(null)
const formEdicao = ref({ name: '', amountStored: 0 })
const mensagem = ref(null)

onMounted(() => {
  materiais.carregarDados()
})

function iniciarEdicao(material) {
  editando.value = material.id
  formEdicao.value = { name: material.name, amountStored: material.amountStored }
  mensagem.value = null
}

function cancelarEdicao() {
  editando.value = null
  formEdicao.value = { name: '', amountStored: 0 }
  mensagem.value = null
}

async function salvarEdicao(id) {
  const resultado = await materiais.atualizarMaterial(id, { ...formEdicao.value })
  if (resultado.success) {
    mensagem.value = { tipo: 'sucesso', texto: 'Material atualizado com sucesso!' }
    editando.value = null
  } else {
    mensagem.value = { tipo: 'erro', texto: resultado.mensagem || 'Erro ao atualizar.' }
  }
}

async function deletarMaterial(id) {
  if (!confirm('Deseja realmente excluir este material?')) return
  const resultado = await materiais.deletarMaterial(id)
  if (!resultado.success) {
    mensagem.value = { tipo: 'erro', texto: resultado.mensagem || 'Erro ao deletar.' }
  }
}
</script>

<template>
  <main class="main-content">
    <div class="summary-bar">
      <h2>Painel de Materiais</h2>
      <span class="count">{{ materiais.listaMateriais.length }} itens</span>
    </div>

    <div v-if="mensagem" :class="['feedback', mensagem.tipo]">
      {{ mensagem.texto }}
    </div>

    <div v-if="materiais.carregando" class="feedback">Carregando...</div>

    <div v-else-if="materiais.erro" class="feedback erro">{{ materiais.erro }}</div>

    <div v-else-if="materiais.listaMateriais.length === 0" class="feedback">
      Nenhum material cadastrado.
    </div>

    <div v-else class="material-grid">
      <div v-for="item in materiais.listaMateriais" :key="item.id" class="material-item">
        <div v-if="editando !== item.id">
          <MaterialCard
            :nomeMaterial="item.name"
            :quantidade="item.amountStored"
          />
          <div class="actions">
            <button class="btn-editar" @click="iniciarEdicao(item)">Editar</button>
            <button class="btn-deletar" @click="deletarMaterial(item.id)">Excluir</button>
          </div>
        </div>

        <div v-else class="card-edicao">
          <div class="field">
            <label>Nome:</label>
            <input type="text" v-model="formEdicao.name" required />
          </div>
          <div class="field">
            <label>Quantidade:</label>
            <input type="number" v-model.number="formEdicao.amountStored" min="0" />
          </div>
          <div class="actions-edicao">
            <button class="btn-salvar" @click="salvarEdicao(item.id)">Salvar</button>
            <button class="btn-cancelar" @click="cancelarEdicao">Cancelar</button>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.feedback {
  text-align: center;
  padding: 40px 20px;
  color: #64748b;
  font-size: 1rem;
}
.feedback.sucesso {
  background-color: #dcfce7;
  color: #166534;
  padding: 10px;
  border-radius: 6px;
  margin-bottom: 16px;
  text-align: center;
  font-weight: 600;
  font-size: 0.9rem;
}
.feedback.erro {
  background-color: #fee2e2;
  color: #991b1b;
  padding: 10px;
  border-radius: 6px;
  margin-bottom: 16px;
  text-align: center;
  font-weight: 600;
  font-size: 0.9rem;
}

.material-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
}

.material-item .actions {
  display: flex;
  gap: 8px;
  margin-top: 12px;
}

.btn-editar, .btn-deletar, .btn-salvar, .btn-cancelar {
  flex: 1;
  padding: 8px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.85rem;
}

.btn-editar {
  background-color: #3b82f6;
  color: white;
}

.btn-deletar {
  background-color: #ef4444;
  color: white;
}

.btn-salvar {
  background-color: #22c55e;
  color: white;
}

.btn-cancelar {
  background-color: #94a3b8;
  color: white;
}

.btn-editar:hover { background-color: #2563eb; }
.btn-deletar:hover { background-color: #dc2626; }
.btn-salvar:hover { background-color: #16a34a; }
.btn-cancelar:hover { background-color: #64748b; }

.card-edicao {
  background-color: #ffffff;
  border: 2px solid #8b5cf6;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.field {
  margin-bottom: 12px;
  display: flex;
  flex-direction: column;
}

.field label {
  font-weight: bold;
  margin-bottom: 4px;
  font-size: 0.85rem;
  color: #475569;
}

.field input {
  padding: 8px;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  font-size: 0.9rem;
}

.actions-edicao {
  display: flex;
  gap: 8px;
  margin-top: 8px;
}
</style>
