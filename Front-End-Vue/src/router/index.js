import { createRouter, createWebHistory } from 'vue-router'
import ListaProdutos from '../views/ListaProdutos.vue'
import CadastroProdutos from '@/views/CadastroProdutos.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: ListaProdutos
    },
    {
      path: '/cadastro',
      name: 'cadastro',
      component: CadastroProdutos
    }
  ]
})

export default router