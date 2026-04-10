import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/ListaProdutos.vue')
    },
    {
      path: '/cadastro',
      name: 'cadastro',
      component: () => import('@/views/CadastroProdutos.vue')
    },
    {
      path: '/materiais',
      name: 'materiais',
      component: () => import('@/views/ListaMateriais.vue')
    },
    {
      path: '/materiais/cadastro',
      name: 'cadastro-material',
      component: () => import('@/views/CadastroMateriais.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/views/ListaProdutos.vue')
    }
  ]
})

export default router