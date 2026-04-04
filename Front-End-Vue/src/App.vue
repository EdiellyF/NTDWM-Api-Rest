<script setup>
  import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="layout-geral">
    <nav class="navbar-profissional">
      <div class="links">
        <RouterLink to="/" class="link"> Estoque</RouterLink>
        <RouterLink to="/cadastro" class="link">➕ Novo Produto</RouterLink>
      </div>
    </nav>
    <main class="conteudo-dinamico">
      <RouterView /> 
    </main>
  </div>
</template>

<style scoped>

:global(html), :global(body) {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  background-color: #f1f5f9;
  font-family: 'Inter', sans-serif;
}

.layout-geral {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}


.navbar-profissional { 
  display: flex; 
  justify-content: space-between;
  align-items: center;
  gap: 20px; 
  padding: 0 5%; 
  height: 70px;
  background: white; 
  border-bottom: 1px solid #e2e8f0;
  box-shadow: 0 2px 4px rgba(0,0,0,0.02);
}

.logo {
  font-weight: 800;
  color: #0f172a;
}

.links {
  display: flex;
  gap: 25px;
}

.link {
  text-decoration: none;
  color: #64748b;
  font-weight: 600;
  font-size: 0.9rem;
  transition: color 0.2s;
}

.router-link-active {
  color: #3b82f6; 
}

.conteudo-dinamico {
  flex: 1;
  padding: 40px 5%;
}
</style>