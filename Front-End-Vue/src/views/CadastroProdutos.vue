

<script setup>



import { ref} from 'vue';
import { useEstoqueStore } from '@/stores/estoque';


const estoque = useEstoqueStore();

 const formData = ref({
    name: "Exemplo",
    value: 0.1,
    amountStored: 0
 })


 const handleSubmit = async () => {
    const resultado = await estoque.criarProduto({...formData.value});

    if (resultado.success) {
         alert("Produto adicionado!");
         formData.value = { name: "", value: 0.1, amountStored: 0 };
    } else {
        alert("Erro ao salvar.");
    }

 }


</script>


<template>
    

<form   @submit.prevent="handleSubmit" action="">
    <div class="field">
            <label>Nome:</label>
            <input type="text" v-model="formData.name" placeholder="Digite o nome" required />
        </div>

        <div class="field">
            <label>Valor:</label>
            <input type="number" v-model.number="formData.value" step="0.01" />
        </div>

        <div class="field">
            <label>Quantidade em Estoque:</label>
            <input type="number" v-model.number="formData.amountStored" />
        </div>

        <button type="submit">Salvar Dados</button>
    </form>

</template>

<style scoped>

.form-container {
  max-width: 400px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-family: sans-serif;
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

.readonly {
  background-color: #f0f0f0;
  cursor: not-allowed;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #42b883;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #35495e;
}


</style>