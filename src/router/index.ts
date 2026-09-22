import { createRouter, createWebHistory } from 'vue-router'
import InicioView from '../views/InicioView.vue'
import CatalogoView from '../views/CatalogoView.vue'
import ContactoView from '../views/ContactoView.vue'
import TiendaComputacion from '../components/TiendaComputacion.vue'

const routes = [
  { path: '/', component: InicioView },
  { path: '/catalogo', component: CatalogoView },
  { path: '/contacto', component: ContactoView },
  { path: '/admin', component: TiendaComputacion } // Panel de administración del formulario anterior
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router