<template>
<div class="card">
  
    <h3 class="titulo-produto">{{ nomeProduto }}</h3>
    <div class="info-estoque">
      <span class="label">Estoque atual</span>
      <div class="valor-estoque">
        <span class="numero">{{ quantidade }}</span>
        <span class="unidade">unid.</span>
      </div>
    </div>
  </div>
</template>

<script setup>
    defineProps({
        nomeProduto: String,
        quantidade: Number
    })
</script>


<style scoped>

.card {
  background-color: #ffffff;
  border: 1px solid #e2e8f0; 
  border-radius: 12px;   
  padding: 24px;
  display: flex;
  flex-direction: column;
  transition: all 0.2s ease-in-out;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}


.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  border-color: #3b82f6; 
}


.titulo-produto {
  color: #1e293b;
  font-size: 1.15rem;
  font-weight: 700;
  margin: 0 0 16px 0;
  letter-spacing: -0.5px;
}


.info-estoque {
  border-top: 1px solid #f1f5f9;
  padding-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.label {
  color: #64748b;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}


.valor-estoque {
  display: flex;
  align-items: baseline;
  gap: 4px;
}

.numero {
  color: #0f172a; 
  font-size: 1.75rem;
  font-weight: 800;
}

.unidade {
  color: #94a3b8;
  font-size: 0.85rem;
  font-weight: 500;
}
</style>